import React from 'react';

import { Container, LottieContent } from './styles';

export function EmptyLottie() {
  return (
    <Container>
      <LottieContent
        source={require('../../assets/lottie/empty-box.json')}
        autoPlay
        loop
      />
    </Container>
  );
}