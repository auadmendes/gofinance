import React, { useState, useEffect } from 'react';
import { Alert, Platform, BackHandler } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { useTheme } from 'styled-components';

import AppleSvg from '../../assets/icons/apple.svg';
import GoogleSvg from '../../assets/icons/google-icon.svg';

import LogoSvg from '../../assets/icons/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { RFValue } from 'react-native-responsive-fontsize';


import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
  Load
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { signWithGoogle, signInWithApple } = useAuth();
  const { colors } = useTheme();

  async function handleSignWithGoogle() {
    try {
      setIsLoading(true);
      return await signWithGoogle();
    } catch (error) {
      Alert.alert('o programador que fez isso é burro e nós não conseguimos conectar. ' + error)
      setIsLoading(false);
    }
  }
  async function handleSignWithGApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      Alert.alert('o programador que fez isso é burro e nós não conseguimos conectar. ' + error)
      setIsLoading(false);
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {

      return true;
    })

  }, [])

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />
          <Title>
            Control your {'\n'}
            bills in a easy {'\n'}
            way
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Login with {'\n'}
          Google or Apple
        </SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title='Sign in with Google'
            svg={GoogleSvg}
            onPress={handleSignWithGoogle}
          />
          {
            Platform.OS === 'ios' &&
            <SignInSocialButton
              title='Sign in with Apple'
              svg={AppleSvg}
              onPress={handleSignWithGApple}
            />
          }
        </FooterWrapper>
        {isLoading && <Load color={colors.shape} style={{ marginTop: 18 }} />}
      </Footer>
    </Container>
  );
}