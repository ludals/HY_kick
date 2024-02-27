import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginAction } from "./../redux/user";

const REGISTER = gql`
mutation RegisterOrAuthenticateUser($authorizationCode: String!, $input: additionalInfo){
  registerOrAuthenticateUser(authorizationCode: $authorizationCode, input: $input){
    jwtToken
  }
}
`;

const useRegister = (storedData) => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { loading }] = useMutation(REGISTER, {
    variables: { authorizationCode: code, input: storedData }
  });

  useEffect(() => {
    const handleRegister = async () => {
      try {
        const response = await register();
        if (loading)
          return;
        const token = response?.data.registerOrAuthenticateUser.jwtToken;
        if (token) {
          dispatch(loginAction(jwtDecode(token)))
          navigate('/home');
        }
        else {
          navigate('/register');
        }
      } catch (error) {
        loading ?? console.error(error.message);
      }
    }

    // register({ variables: { 'authorizationCode': code, 'input': storedData } })
    //   .then(response => {
    //     const token = response.data.registerOrAuthenticateUser.jwtToken;
    //     setToken(jwtDecode(token));
    //   })
    //   .catch(error => {
    //     console.error('Registration failed:', error);
    //   });


    handleRegister();
  }, [loading])
}

export default useRegister;