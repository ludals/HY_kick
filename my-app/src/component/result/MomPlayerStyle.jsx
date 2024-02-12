import styled from "styled-components";
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR,
  WIDTH
} from "../../constants/styleconstant";

export const MomPlayerWrapper = styled.div`
  width: ${WIDTH};
  height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: darkslategray;
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
  font-weight: 700;
  .title{
    font-size: 2rem;
  }
  >:last-child{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    img{
      width: 2rem;
      height: 2rem;
    }
    .mom{
      font-size: 1.5rem;
    }
  }
`;