import React, {
  createContext,
  ReactNode,
  useContext
} from "react";

import * as AuthSession from 'expo-auth-session';

//409241814456-5tvgvfjefkes7l7gqsqtusdgj8lbctd9.apps.googleusercontent.com

//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

interface AuthProvideProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signWithGoogle(): Promise<void>;
}


const AuthContext = createContext({} as IAuthContextData);


function AuthProvider({ children }: AuthProvideProps) {
  const user = {
    id: '12345',
    name: 'Luciano Mendes Horta',
    email: 'luciano.horta@gmal.com'
  }

  async function signWithGoogle() {
    try {
      const CLIENT_ID = '409241814456-5tvgvfjefkes7l7gqsqtusdgj8lbctd9.apps.googleusercontent.com';
      const REDIRECT_URI = 'https://auth.expo.io/@horta/gofinance';
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const response = await AuthSession.startAsync({ authUrl })
      console.log(response)

    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{
      user,
      signWithGoogle
    }}>
      {children}
    </AuthContext.Provider >
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }