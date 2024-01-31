import styled from "styled-components";

export const showItems = (ITEMS) => {
  return (
    <section>
      {
        ITEMS.map((item) => {
          return (
            <div key={`${item}`}>{item}</div>
          );
        })
      }
    </section>
  );
};

export const showTeam1Detail = (Team1, Team2) => {
  return (
    <section className="result">
      {
        Team1.map((content, index) => {
          return (
            <div className={Team1[index] < Team2[index] ? "lose" : ""}>
              {content}
            </div>
          )
        })
      }
    </section>
  );
};

export const showTeam2Detail = (Team1, Team2) => {
  return (
    <section className="result">
      {
        Team2.map((content, index) => {
          return (
            <div className={Team2[index] < Team1[index] ? "lose" : ""}>
              {content}
            </div>
          )
        })
      }
    </section>
  );
};

export const DetailInfoWrapper = styled.div`
  min-width: 20rem;
  height: 20rem;
  padding: 0 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    height: 100%;
  }
`;

export const DetailInfoContainer = styled.div`
  width: 25rem;
  height: 20rem;
  border: 1px solid lightgray;
  display: flex;
  overflow: hidden;
`;

export const DetailInfo = styled.div`
  min-width:20rem;
  height: 100%;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1.2fr;
  grid-template-rows: 4rem 1fr;
  >:nth-child(1){
    grid-area:1/1/2/4;
  }
  >:nth-child(2){
    grid-area: 2/2/3/3;
  }
  >:nth-child(3){
    grid-area: 2/1/3/2;
  }
  >:nth-child(4){
    grid-area: 2/3/3/4;
  }
  >section{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    font-weight: 700;
  }
  .result{
    font-size: 1.5rem;
    .lose{
      animation: opacityDown 0.5s ease-in both;
    }
  }
  @keyframes opacityDown {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0.3;
    }
  }
`;

export const RefereeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 0.3rem;
  img{
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
  }
  >:nth-child(n){
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    font-size: 1rem;
    font-weight: 700;
  }
`;