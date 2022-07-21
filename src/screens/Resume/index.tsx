import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { VictoryPie } from 'victory-native';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { EmptyLottie } from '../../components/EmptyLottie';
import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../categories';

import { RFValue } from 'react-native-responsive-fontsize';

import {
  Container,
  Title,
  Header,
  Content,
  ChartContainer,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
  Load,
} from './styles';


interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const theme = useTheme();
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date);
  const [isLoading, setIsLoading] = useState(false);



  function handleDateChange(action: 'next' | 'previous') {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = '@goFinance:transactions';
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted
      .filter((expense: TransactionData) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
      );

    const expensesTotal = expenses
      .reduce((accumulator: number, expense: TransactionData) => {
        return accumulator + Number(expense.amount);
      }, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount)
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = `${(categorySum / expensesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent
        })
      }
    });

    setTotalByCategories(totalByCategory)
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (

    <Container>
      {
        isLoading ?
          <LoadContainer>
            <Load
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
          :
          <>
            <Header>
              <Title>Summary</Title>
            </Header>

            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingBottom: useBottomTabBarHeight(),

              }}
            >

              <MonthSelect>
                <MonthSelectButton onPress={() => handleDateChange('previous')}>
                  <MonthSelectIcon name="chevron-left" />
                </MonthSelectButton>
                <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                <MonthSelectButton onPress={() => handleDateChange('next')}>
                  <MonthSelectIcon name="chevron-right" />
                </MonthSelectButton>
              </MonthSelect>

              {
                totalByCategories.length < 1 ? <EmptyLottie /> :

                  <>
                    <ChartContainer>
                      <VictoryPie
                        //labelRadius={({ innerRadius }) => innerRadius + 5}
                        innerRadius={70}
                        data={totalByCategories}
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                          labels: {
                            fontSize: RFValue(18),
                            fontWeight: 'bold',
                            fill: theme.colors.shape
                          }

                        }}
                        labelRadius={85}
                        x="percent"
                        y="total"
                      />
                    </ChartContainer>

                    {
                      totalByCategories.map(item => (
                        <HistoryCard
                          key={item.key}
                          title={item.name}
                          amount={item.totalFormatted}
                          color={item.color}
                        />
                      ))

                    }
                  </>
              }

            </Content>
          </>
      }
    </Container >

  );
}