import styled from "styled-components";

export const TabWrapper = styled.div` 
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  >div{
    width: 7rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: navy;
    background-color: #f5f2f5;
    border-radius: 5rem;
    font-weight: 700;
    box-sizing: border-box; 
  }
  .active{
    background-color: #ffffff;
    border: 3px solid #f5f2f5;
  }
  
  :hover{
    background-color: #ffffff;
    border: 3px solid #f5f2f5;
  }
`;