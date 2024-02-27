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
import useKakaoLogin from "../hooks/useKakaoLogin";

const Splash = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  // const user = { id: 1 };
  const HYKICK = ['H', 'Y', '-', 'K', 'I', 'C', 'K'];

  const kakaoURL = useKakaoLogin();

  useEffect(() => {
    setTimeout(() => {
      user.id && navigate('/home');
    }, 4500);
  }, []);

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