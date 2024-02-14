import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SplashLayout,
  Logo,
  GoalImg,
  HylionImg,
  SoccerBall,
  KakaoButton
} from "../component/splash/SplashStyle";
import { useEffect } from "react";

const Splash = () => {
  // const user = useSelector((state) => state.user.value);
  const user = { id: 1 };
  const navigate = useNavigate();
  const HYKICK = ['H', 'Y', '-', 'K', 'I', 'C', 'K'];

  const REST_API_KEY = '531ad8ca7724886e585bdd16b39a39bc';
  const REDIRECT_URI = 'http://localhost:3000/auth';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    setTimeout(() => {
      if (user.id) {
        navigate('/home');
      }
    }, 4500);
  }, [])

  const onclick = () => {
    window.location.href = kakaoURL;
  };

  return (
    <SplashLayout>
      <Logo>
        {
          HYKICK.map((content, idx) => {
            return (
              <span key={`${content}${idx}`}>{content}</span>
            )
          })
        }
      </Logo>
      <GoalImg src="/image/goal.png" />
      <HylionImg src="/image/Hylion.png" />
      <SoccerBall src="/image/soccerball.gif" />
      {user.id ?? <KakaoButton src='/image/kakao-login.png' alt="" onClick={onclick} />}
    </SplashLayout>
  );
}

export default Splash;