import styled from "styled-components";
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR
} from "../../constants/styleconstant";

export const CalenderWrapper = styled.div`
  width: 40rem;
  height: auto;
  padding: 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
  @media (max-width: 600px){
      width: 25rem;
    }
`;

export const MonthSelectWrapper = styled.div`
  width: 70%;
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const WeekWrapper = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  img{
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    @media (max-width: 600px){
      width: 1.5rem;
      height: 1.5rem;
    }
  }
  .prevWeek{
    visibility: ${(props) => (props.$date.getDate() - (props.$date.getDay() + 1) <= 0) ? "hidden" : "visible"};
  }
  .nextWeek{
    visibility: ${(props) => (props.$date.getDate() + (7 - props.$date.getDay()) > props.$days[props.$date.getMonth()]) ? "hidden" : "visible"};
  }
`;

export const WeekView = styled.div`
  width: 35rem;
  height:3rem;
  display: flex;
  justify-content: ${(props) => (props.$date.getDate() - (props.$date.getDay() + 1) <= 0) ? "end" : "start"};
  @media (max-width: 600px){
      width: 21rem;
  }
`;

export const DayWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 5rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  
  @media (max-width: 600px){
    width: 3rem;
  }
  .day{
    width: 5rem;
    height: 1rem;
    font-size:0.8rem;
    color: ${(props) => (props.$date.getTime() === props.$clicked.getTime() ? "blue" : props.$isActive !== 0 ? "black" : "lightgray")};
    @media (max-width: 600px){
        width: 3rem;
    }
  }
  .date{
    width: 5rem;
    height: 2rem;
    font-size: 1.4rem;
    color: ${(props) => (props.$date.getTime() === props.$clicked.getTime() ? "blue" : props.$isActive !== 0 ? "black" : "lightgray")};
    @media (max-width: 600px){
        width: 3rem;
    }
  }
  .selectBar{
    width: 3rem;
    @media (max-width: 600px){
        width: 2rem;
    }
    height: 2px;
    background-color: ${(props) => (props.$date.getTime() === props.$clicked.getTime() ? "blue" : "white")};
  }
`;
export const MatchWrapper = styled.div`
  /* width: 100%; */
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .dateInfo{
    width: 30rem;
    height: 2rem;
    margin-top: 2rem;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    @media (max-width: 600px){
      width: 20rem;
    }
  }
`;

export const MatchView = styled.div`
  width: 30rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px){
    width: 20rem;
  }
  .matchNum{
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1rem;
  }
  .leaguetype{
    width: 100%;
    height: 2rem;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
  .matchInfo{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    img{
      width: 30px;
      height: 30px;
      border-radius: 70%;
      overflow: hidden;
    }
    .hometeam{
      width: 5rem;
      display: flex;
      justify-content: end;
    }
    .awayteam{
      width: 5rem;
      display: flex;
      justify-content: start;
    }
    .versus{
      width: 4rem;
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border : 1px solid black;
      border-radius: 10px;
      /* background: navy; */
    }
  }
`;