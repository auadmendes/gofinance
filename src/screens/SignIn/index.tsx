import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/icons/apple.svg';
import GoogleSvg from '../../assets/icons/google-icon.svg';
import LogoSvg from '../../assets/icons/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles';

export function SignIn() {
  const { signWithGoogle } = useAuth();

  async function handleSignWithGoogle() {
    try {
      await signWithGoogle();
    } catch (error) {
      Alert.alert('o programador que fez isso é burro e nós não conseguimos conectar. ' + error)
    }
  }

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
            onPress={handleSignWithGoogle}
            title='Sign in with Google'
            svg={GoogleSvg}
          />
          <SignInSocialButton

            title='Sign in with Apple'
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}