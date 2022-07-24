import styled from 'styled-components/native';
//import LottieView from 'lottie-react-native';

const LottieView = require("lottie-react-native");

export const Container = styled.View`
  flex: 1;
  width: 100%;
  //background-color: red;

  justify-content: center;
  align-items: center;

  margin-top: 90px;
`;

export const LottieContent = styled(LottieView)`
  flex: 1;
  width: 350;
  height: 350;
`;