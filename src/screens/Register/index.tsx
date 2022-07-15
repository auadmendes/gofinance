import React, { useState, useEffect } from "react";

import {
  Keyboard,
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm } from 'react-hook-form';

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from "../CategorySelect";



import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
  ButtonWithoutFeedback,
  ModalView
} from './styles';

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup
    .string()
    .required('Name is required'),
  amount: Yup
    .number()
    .transform((_value, originalValue) => Number(originalValue.replace(/,/g, '')))
    .typeError('type a number')
    .positive('Only positive numbers')
    .required('amount is required')
})

export function Register() {
  const dataKey = '@goFinance:transactions';
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'category'
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  function handleTransactionsTypesSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true);
  }
  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Select the transaction type.  Income | Outcome')

    if (category.key === 'category')
      return Alert.alert('Select one category.')

    const newTransaction = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    try {
      const data = await AsyncStorage.getItem(dataKey)
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

    } catch (error) {
      console.log(error)
      Alert.alert('Sorry, we could not create it.')
    }
  }

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(dataKey)
      console.log(JSON.parse(data!))
    }
    loadData();
  }, [])

  return (
    <ButtonWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Registration</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              control={control}
              name="name"
              placeholder="Name"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name && errors.name.message}
            />
            <InputForm
              control={control}
              name="amount"
              placeholder="Price"
              keyboardType="numeric"
              error={errors.amount && errors.amount.message}
            />
            <TransactionsTypes>
              <TransactionTypeButton
                type='up'
                title='Income'
                onPress={() => handleTransactionsTypesSelect('up')}
                isActive={transactionType === 'up'}
              />
              <TransactionTypeButton
                type='down'
                title='Outcome'
                onPress={() => handleTransactionsTypesSelect('down')}
                isActive={transactionType === 'down'}
              />
            </TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </Fields>

          <Button
            title="Send"
            onPress={handleSubmit(handleRegister)}
          />

        </Form>
        <ModalView visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </ModalView>
      </Container>
    </ButtonWithoutFeedback>
  );
}