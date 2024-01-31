import styled from "styled-components";

export const MomPlayerWrapper = styled.div`
  width: 25rem;
  height: 6rem;
  border: 1px solid lightgray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  color: darkslategray;
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