// import kakao from "./kakao_login_medium_narrow.png"

import { useState } from "react";
import styled from "styled-components"

const Login = () => {
    // const CLIENT_ID = '백엔드한테 달라하자1';
    // const REDIRECT_URI = '백엔드한테 달라하자2';
    // const link = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  

    // const onclick = () => {
    //     window.location.href = link;
    // }

    // return(
    //     <>
    //         <img src = {kakao} alt = "" onClick={onclick}>
    //         </img>
    //     </>
    // );
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");

    const formStyle = {
        height: "2rem",
        marginBottom: "1rem",
    };

    const onIdHandler = (e) => {
        setId(e.currentTarget.value);
    };

    const onPasswordHanlder = (e) => {
        setPassword(e.currentTarget.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();

        console.log("login");
    };
    
    return(
        <LoginWrapper>
            <LoginForm onSubmit={onSubmitHandler}>
                <label htmlFor="id">아이디</label>
                <input type="text" value={id} id="id" style={formStyle} onChange={onIdHandler} />
                <label htmlFor="password">비밀번호</label>
                <input type="password" value={password} id="password"style={formStyle} onChange={onPasswordHanlder} />
                <button type="submit" style={{height:"2rem", background:"navy", color:"white"}}>로그인</button>
            </LoginForm>
        </LoginWrapper>
    );
};

export default Login;

const LoginWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
`;

const LoginForm = styled.form`
    width: 20rem;
    height: auto;
    display: flex;
    flex-direction: column;
`;