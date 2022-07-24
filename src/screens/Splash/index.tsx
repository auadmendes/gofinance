import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { SplashScreen } from '../../components/SplashScreen';
import { SignIn } from '../SignIn';
import { Container } from './styles';

export function Splash() {
  const navigation = useNavigation();
  return (
    <Container>
      <SplashScreen
        onAnimationFinish={() => navigation.navigate(SignIn)}
      />
    </Container>
  );
}