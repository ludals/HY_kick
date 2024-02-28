import styled from "styled-components"

const Loading = () => {
  return (
    <LoadingImg src="/image/soccerball.gif" />
  )
}

export default Loading;

const LoadingImg = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;