import React from 'react';
import { categories } from '../../categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles';

import { Alert, TouchableWithoutFeedback } from 'react-native'

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface Props {
  data: TransactionCardProps;
  deleteItem(): Promise<void>;
}

export function TransactionCard({ data, deleteItem }: Props) {
  const [category] = categories.filter(
    item => item.key === data.category
  );

  function ButtonFocus() {
    Alert.alert('focus')
  }

  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data.id)}>
      <Container>
        <Title>{data.name}</Title>
        <Amount type={data.type}>
          {data.type === 'negative' && '- '}
          {data.amount}
        </Amount>
        <Footer>
          <Category>
            <Icon name={category.icon} />
            <CategoryName>{category.name}</CategoryName>
          </Category>
          <Date>{data.date}</Date>
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  )
}