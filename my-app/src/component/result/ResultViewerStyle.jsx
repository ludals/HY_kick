import styled from "styled-components";
import {
  BORDER_RADIUS_30,
  BACKGROUND_COLOR,
  WIDTH,
  SHADOW
} from "../../constants/styleconstant";

export const ResultWrapper = styled.div`
  width: ${WIDTH};
  height: calc(${WIDTH} / 8 * 5);
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 0.5fr 1fr 2fr 0.5fr;
  grid-template-rows: 1fr 1.5fr 1.2fr;
  background-color: ${BACKGROUND_COLOR};
  border-radius: ${BORDER_RADIUS_30};
  box-shadow: ${SHADOW};
  >:nth-child(n){
    display: flex;
    justify-content: center;
    align-items: center;
  }
  >:nth-child(1){
    grid-area: 1/3/2/6;
  }
  >:nth-child(2){
    grid-area: 2/2/3/3;
  }
  >:nth-child(3){
    grid-area: 2/3/3/4;
  }
  >:nth-child(4){
    grid-area: 2/4/3/5;
  }
  >:nth-child(5){
    grid-area: 2/5/3/6;
  }
  >:nth-child(6){
    grid-area: 2/6/3/7;
  }
  >:nth-child(7){
    grid-area: 3/3/4/6;
    justify-content: center;
  }
  .versus{
    font-size: 2rem;
  }
`;

export const Dateform = styled.div`
  text-align: center;
  font-weight: 700;
`;

export const Score = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

export const Place = styled.div`
  text-align: center;
  font-weight: 700;
`;