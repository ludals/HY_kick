import styled from "styled-components";
import { HANYANG_BLUE } from "../../constants/styleconstant"

export const SplashLayout = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: ${HANYANG_BLUE};
  overflow: hidden;
`;

export const SoccerBall = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  animation: SoccerBall 2.5s linear 1s both;
  @keyframes SoccerBall {
    0% {
      opacity: 0;
      top: 70%;
      left: 35%;
    }
    50%{
      opacity: 0;
    }
    80% {
      opacity: 1;
      top: 70%;
      left: 35%;
    }
    85% {
      top: 63%;
      left: 28%;
    }
    90% {
      top: 54%;
      left: 30%;
    }
    95% {
      top: 45%;
      left: 40%;
    }
    100% {
      top: 36%;
      left: 50%;
    }
  }
`;

export const Logo = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  color: white;
  animation: Splash 500ms ease-in-out 500ms both;
  @keyframes Splash {
    0%{
      top: 50%;
    }
    100%{
      top: 20%;
    }
  }
`;

export const GoalImg = styled.img`
  width: 10rem;
  height: 10rem;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: Goal 500ms ease-in-out 1s both;
  @keyframes Goal {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`;

export const HylionImg = styled.img`
  width: 15rem;
  height: 15rem;
  position: absolute;
  top: 60%;
  transform: translate(-50%, -50%);
  animation: HyLion 2s ease-in-out 1s both;
  @keyframes HyLion {
    0%{
      left: 120%;
    }
    33%{
      left: 100%;
    }
    66%{
      left: 80%;
    }
    100%{
      left: 60%;
    }
  }
`;

export const KakaoButton = styled.img`
  position: absolute;
  left: 50%;
  bottom: 5rem;
  transform: translateX(-50%);
  animation: Kakao 0.5s ease-in-out 3.5s both;
  @keyframes Kakao {
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }
`;