import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SignIn } from '../../screens/SignIn';

import { Container, LottieContent } from './styles';


export function SplashScreen({ ...rest }) {
  const navigation = useNavigation();

  return (
    <Container>
      <LottieContent
        source={require('../../assets/lottie/splash-screen.json')}
        autoPlay
        loop={false}
        speed={1.5}
        autoSize
        {...rest}
      />
    </Container>
  );
}