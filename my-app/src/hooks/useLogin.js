import { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/user";

const LOGIN = gql`
  mutation LoginWithKakao($authorizationCode: String!){
    loginWithKakao(authorizationCode: $authorizationCode){
      jwtToken
    }
  }
`;

const useLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { loading }] = useMutation(LOGIN, {
    variables: { authorizationCode: code },
  });

  useEffect(() => {
    const handleLogin = async () => {
      try {
        const response = await login();
        if (loading)
          return;
        const token = response?.data.loginWithKakao.jwtToken;
        if (token) {
          dispatch(loginAction(jwtDecode(token)));
          navigate('/home');
        }
        else {
          navigate('/register');
        }
      } catch (error) {
        loading ?? console.error(error.message);
      }
    }

    handleLogin();
  }, [loading])
}

export default useLogin;