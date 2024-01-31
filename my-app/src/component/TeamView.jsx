import styled from "styled-components";

const TeamView = ({ teamName }) => {
  return (
    <>
      <TeamViewWrapper>
        <img
          src="/image/gaebal.jpg"
          alt=""
        />
        <div>{teamName}</div>
      </TeamViewWrapper>
    </>
  );
}

export default TeamView;

const TeamViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >img{
    width: 100%;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  >div{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 700;
  }
`;