import React from 'react';

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
  LogoutButton
} from './styles';

export interface DataListProps extends TransactionCardProps {
  id: string;
}


const data: DataListProps[] = [
  {
    id: '1',
    type: 'positive',
    title: 'Overtime hours',
    amount: '350,00',
    category: {
      name: 'Extra',
      icon: 'coffee'
    },
    date: "13/04/2020"
  },
  {
    id: '20',
    type: 'negative',
    title: 'Power bill',
    amount: '250,00',
    category: {
      name: 'Bills',
      icon: 'dollar-sign'
    },
    date: "02/04/2020"
  },
  {
    id: '7',
    type: 'negative',
    title: 'Internet bill',
    amount: '250,00',
    category: {
      name: 'Bills',
      icon: 'shopping-bag'
    },
    date: "02/04/2020"
  },
];

export function Dashboard() {

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/5294488?v=4' }} />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Luciano</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => { }}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>
      <HighlighCards
      >
        <HighlighCard type='up' title='incoming' amount='R$ 17.400,00' lastTransaction='Last income April 13' />
        <HighlighCard type='down' title='withdrawal' amount='R$ 1.259,00' lastTransaction='Last withdrawal April 3' />
        <HighlighCard type='total' title='Total' amount='R$ 1.259,00' lastTransaction='Last withdrawal April 3' />

      </HighlighCards>

      <Transactions>
        <Title>Transactions List</Title>
        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  )
}