import { RFPercentage } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';


const LottieView = require("lottie-react-native");

export const Container = styled.View`
  flex: 1;
  width: 100%;
  
  justify-content: center;
  align-items: center;

  margin-top: 90px;

  background-color: ${( {theme} ) => theme.colors.primary};
`;

export const LottieContent = styled(LottieView)`
  flex: 1;
  width: ${RFPercentage(100)};
  height: ${RFPercentage(100)};
  margin-top: -30px;
`;