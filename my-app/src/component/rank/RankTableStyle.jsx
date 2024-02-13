import styled from "styled-components"

export const TableWrapper = styled.div`
    width: 25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: navy;
    font-weight: 500;
`;

export const TableHeader = styled.div`
  width: 100%;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  >:nth-child(1){
    flex: 1;
  }
  >:nth-child(2){
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: start;
  }
  >:nth-child(3){
    flex: 2;
  }
  >:nth-child(4),
  >:nth-child(5),
  >:nth-child(6),
  >:nth-child(7),
  >:nth-child(8){
    flex: 1;
  }
`;

export const TableBody = styled.div`
  width: 100%;
  height: 2rem; 
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1rem;
  border-top: 3px solid rgb(245, 242, 245);
  /* border-bottom: 1px solid rgb(245, 242, 245); */
  padding: 0.5rem 0;
  .link{
    display: flex;
    align-items: flex-end;
    gap: 0.3rem;
    font-size: 0.6rem;
    font-weight:1000;
    color: lightgray;
  }
  >:nth-child(1){
    flex: 1;
    font-size: 1.7rem;
    padding-bottom: 0.2rem;
  }
  >:nth-child(2){
    flex: 2;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 0.2rem;
    img{
      width: 1.5rem;
      border-radius: 50%;
    }
  }
  >:nth-child(3){
    flex: 1.7;
  }
  >:nth-child(4),
  >:nth-child(5),
  >:nth-child(6),
  >:nth-child(7),
  >:nth-child(8){
    flex: 1;
  }
`;