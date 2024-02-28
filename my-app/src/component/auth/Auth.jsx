import { useEffect, useRef, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/user";

const LOGIN = gql`
  mutation LoginWithKakao($authorizationCode: String!){
    loginWithKakao(authorizationCode: $authorizationCode){
      jwtToken
    }
  }
`;

const Auth = () => {
  const [login] = useMutation(LOGIN);
  const code = new URL(window.location.href).searchParams.get("code");
  const [jwt, setJwt] = useState(null);
  const mutationCalled = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      login({
        variables: { authorizationCode: code },
        onCompleted: (data) => {
          console.log(data?.loginWithKakao.jwtToken)
          setJwt(data?.loginWithKakao.jwtToken);
        },
        onError: (error) => {
          console.error(error.message);
        },
      });
      mutationCalled.current = true;
    }

    !mutationCalled.current && fetchData();
  }, [])

  useEffect(() => {
    if (!jwt)
      return;
    if (jwt) {
      const userInfo = jwtDecode(jwt);
      dispatch(loginAction(userInfo));
      navigate('/home');
    }
    else {
      navigate('/register');
    }
  }, [jwt])
}

export default Auth;