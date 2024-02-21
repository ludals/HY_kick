import styled from "styled-components";

const Upcoming = () => {
  return (
    <UpcomingWrapper>
      <div className="title">일정</div>
      <Item>
        <div className="vs">vs</div>
        <img src="/image/gaebal.jpg" alt="" />
        <div className="teamname">개발</div>
        <div className="time">3.1(수) 12:00</div>
      </Item>
      <Item>
        <div className="vs">vs</div>
        <img src="/image/gaebal.jpg" alt="" />
        <div className="teamname">개발</div>
        <div className="time">3.1(수) 12:00</div>
      </Item>
      <Item>
        <div className="vs">vs</div>
        <img src="/image/gaebal.jpg" alt="" />
        <div className="teamname">개발</div>
        <div className="time">3.1(수) 12:00</div>
      </Item>
    </UpcomingWrapper>
  );
};

export default Upcoming;

const UpcomingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  .title{
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    color: white;
  }
`;

const Item = styled.div`
  width: 100%;
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  color: white;
  >img{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
  }
  >:nth-child(n){
    font-size: 0.8rem;
    text-align: center;
    white-space: pre;
  }
`;