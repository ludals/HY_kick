import { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";
import useTeamData from "../../hooks/useTeamData"
import Spinner from "../Spinner";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/user";

const Auth = () => {
  useLogin();
}

export default Auth;