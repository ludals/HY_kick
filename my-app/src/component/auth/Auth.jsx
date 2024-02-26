import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation, gql } from '@apollo/client';
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginAction } from "../../redux/user";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const code = new URL(window.location.href).searchParams.get("code");
  const LOGIN = gql`
    mutation LoginWithKakao($authorizationCode: String!){
      loginWithKakao(authorizationCode: $authorizationCode){
        jwtToken
      }
    }
  `;
  const REGISTER = gql`
    mutation RegisterOrAuthenticateUser($authorizationCode: String!, $input: additionalInfo){
      registerOrAuthenticateUser(authorizationCode: $authorizationCode, input: $input){
        jwtToken
      }
    }
  `;


  const [login] = useMutation(LOGIN);
  const [register] = useMutation(REGISTER);

  useEffect(() => {
    const Login = async () => {
      const storedData = JSON.parse(localStorage.getItem('register'));
      let response;

      if (storedData) {
        try {
          response = await register({
            variables: { "authorizationCode": code, "input": storedData }
          });
        } catch (error) {
          console.error('Registration failed:', error);
          navigate('/register');
        }
      }
      else {
        try {
          response = await login({
            variables: { "authorizationCode": code }
          });
        } catch (error) {
          console.error('Login failed:', error);
          navigate('/register');
        }
      }
      const token = response.data.loginWithKakao.jwtToken;
      const decodedToken = jwtDecode(token);
      dispatch(loginAction(decodedToken))
      navigate('/home');
    }

    Login();
  }, []);
}

export default Auth;