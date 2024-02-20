import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode }from 'jwt-decode';
import { authContext } from '../src/store/userContext';
import { login } from './store/types';
const clientId = process.env.clientId;

const GoogleLoginButton = () => {
  const { dispatch } = useContext(authContext);

  const onError = (error) => {
    console.error('Login Error:', error);
  };

  return (
    <div>
      <p>Login with Google</p>
      <GoogleLogin
        clientId={clientId}
        onSuccess={(credentialResponse) => {
          try {
            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
            console.log('Decoded JWT Payload:', credentialResponseDecoded);
            dispatch({ type: login, payload: credentialResponseDecoded }); 
          } catch (error) {
            console.error('Error decoding token:', error);
          }
        }}
        onError={onError} 
        buttonText="Login with Google"
      />
    </div>
  );
};

export default GoogleLoginButton;
