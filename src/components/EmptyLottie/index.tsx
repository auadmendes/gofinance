import React from 'react';

import LottieView from 'lottie-react-native';
//import LottieView = require("lottie-react-native");

import Animation from '../../assets/lottie/empty-box.json';
import { Container, LottieContent } from './styles';

export function EmptyLottie() {
  return (
    <Container>
      <LottieContent
        autoPlay
        style={{
          width: 350,
          height: 350,

        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/lottie/empty-box.json')}
      />
    </Container>
  );
}