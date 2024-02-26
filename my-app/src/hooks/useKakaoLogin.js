const useKakaoLogin = () => {
  const REST_API_KEY = '531ad8ca7724886e585bdd16b39a39bc';
  const REDIRECT_URI = 'http://localhost:3000/auth';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (kakaoURL);
}

export default useKakaoLogin;