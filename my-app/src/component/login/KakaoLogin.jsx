import styled from "styled-components";

const KakaoLogin = () => {
  const REST_API_KEY = '531ad8ca7724886e585bdd16b39a39bc';
  const REDIRECT_URI = 'http://localhost:3000/auth';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const code = new URL(window.location.href).searchParams.get("code");

  const onclick = () => {
    window.location.href = kakaoURL;
  }

  return (
    <AuthWrapper>
      <KakaoButton src='/image/kakao-login.png' alt="" onClick={onclick} />
    </AuthWrapper>
  );
};

export default KakaoLogin;

const AuthWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const KakaoButton = styled.img`
  position: absolute;
  left: 50%;
  bottom: 3rem;
  transform: translateX(-50%);
`;