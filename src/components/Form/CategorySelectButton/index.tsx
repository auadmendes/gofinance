import React from 'react';
import {
  ButtonContainer,
  Category,
  Icon
} from './styles';


interface Props {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress
}: Props) {
  return (
    <ButtonContainer onPress={onPress}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </ButtonContainer>
  );
}