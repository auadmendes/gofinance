import React, { useCallback, useEffect, useState } from 'react';

import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useAuth } from '../../hooks/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HighlighCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';


import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlighCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
  Load,
  PhotoContainer
} from './styles';
import { Alert } from 'react-native';


export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string,
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps,
  expenses: HighlightProps,
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>();
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

  const theme = useTheme();

  const { signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {

    const collectionFiltered = collection
      .filter(transaction => transaction.type === type);

    if (collectionFiltered.length === 0) {
      return 0;
    }

    const lastTransaction = new Date(
      Math.max.apply(Math, collectionFiltered
        .map(transaction => new Date(transaction.date).getTime())));

    return `${lastTransaction.getDate()} de ${lastTransaction
      .toLocaleDateString('pt-BR', { month: 'long' })}`;

  }

  async function loadTransactions() {
    const dataKey = `@goFinance:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount)
        } else {
          expenseTotal += Number(item.amount)
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,

        }

      });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative');

    const totalInterval = lastTransactionExpenses === 0
      ? 'There are no transactions'
      : `01 to ${lastTransactionExpenses}`

    const total = entriesTotal - expenseTotal;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionEntries === 0 ? 'You do not have transactions'
          : `Last income ${lastTransactionEntries}`,
      },
      expenses: {
        amount: expenseTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionExpenses === 0 ? 'You do not have transactions'
          : `Last Withdraw ${lastTransactionExpenses}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  async function handleAlert() {
    const dataKey = `@goFinance:transactions_user:${user.id}`;

    Alert.alert(
      '🚨 Are you sure?',
      "You're about to delete all of your data.",
      [
        {
          text: 'Yes', onPress: () => {
            AsyncStorage.removeItem(dataKey)
            loadTransactions();
          }
        },
        {
          text: 'No', onPress: () => {

          }
        }
      ]
    )
  }

  async function handleDeleteAllData() {

  }

  async function handleDeleteTransaction(TransactionId: string) {
    const dataKey = `@goFinance:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const newNotes = transactions
      .filter((item: DataListProps) => item.id !== TransactionId)

    Alert.alert(
      '🚨 Are you sure?',
      "You're about to delete this transaction.",
      [
        {
          text: 'Yes', onPress: () => {
            AsyncStorage.setItem(dataKey, JSON.stringify(newNotes));
            loadTransactions();
          }
        },
        {
          text: 'No', onPress: () => {

          }
        }
      ]
    )

  }

  async function handleDeleteTransactionsss(TransactionId: string) {
    const dataKey = `@goFinance:transactions_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    const newNotes = transactions
      .filter((item: DataListProps) => item.id !== TransactionId)

    await AsyncStorage.setItem(dataKey, JSON.stringify(newNotes));
    loadTransactions();
  }


  useEffect(() => {
    loadTransactions();
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []))

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
              <UserWrapper>
                <UserInfo>
                  <PhotoContainer onLongPress={handleDeleteAllData}>
                    <Photo source={{ uri: user.photo }} />
                  </PhotoContainer>
                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>{user.name}</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={signOut}>
                  <Icon name='power' />
                </LogoutButton>
              </UserWrapper>
            </Header>
            <HighlighCards
            >
              <HighlighCard
                type='up'
                title='incoming'
                amount={highlightData.entries.amount}
                lastTransaction={highlightData.entries.lastTransaction} />
              <HighlighCard
                type='down'
                title='withdrawal'
                amount={highlightData.expenses.amount}
                lastTransaction={highlightData.expenses.lastTransaction} />
              <HighlighCard
                type='total'
                title='Total'
                amount={highlightData.total.amount}
                lastTransaction={highlightData.total.lastTransaction} />

            </HighlighCards>

            <Transactions>
              <Title>Transactions List</Title>
              <TransactionList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <TransactionCard
                  data={item}
                  deleteItem={handleDeleteTransaction} />}
              />

            </Transactions>
          </>
      }
    </Container>
  )
}