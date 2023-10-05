import kakao from "./kakao_login_medium_narrow.png"

const Login = () => {
    const CLIENT_ID = '백엔드한테 달라하자1';
    const REDIRECT_URI = '백엔드한테 달라하자2';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  

    const onclick = () => {
        window.location.href = link;
    }

    return(
        <>
            <img src = {kakao} alt = "" onClick={onclick}>
            </img>
        </>
    );
};

export default Login;