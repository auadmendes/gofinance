import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { PropsWithChildren } from 'react';


interface ButtonProps extends PropsWithChildren<RectButtonProps> {
  
}

export const Container = styled(RectButton)<ButtonProps>`
  width: 100%;
  background-color: ${({theme})=> theme.colors.secondary};

  padding: 18px;
  border-radius: 5px;
  align-items: center;
  
`;
export const Title = styled.Text`
  font-family: ${({theme})=> theme.fonts.medium};
  font-size: ${RFValue(14)}px;

  color: ${({theme})=> theme.colors.shape};
`;

