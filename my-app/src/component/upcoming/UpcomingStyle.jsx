import styled from "styled-components";
import { WIDTH } from "../../constants/styleconstant";

export const UpcomingWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .upcoming_container{
    display: flex;
    gap: 3rem;
    transition: transform 0.5s ease;
  }
`;

export const UpcomingHeader = styled.div`
  width: 22rem;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: white;
  font-weight: 700;
`;

export const UpcomingView = styled.div`
  width: calc(${WIDTH} + 2rem);
  height: calc(${WIDTH} / 8 * 5 + 1rem);
  overflow: hidden;
`;

export const UpcomingBody = styled.div`
  display: flex;
  margin: 0 1rem;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap : 0.5rem;
  margin-bottom: 1rem;
`;

export const PaginationDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  /* border: 1px solid navy; */
  background: ${(props) => (props.$imgcount !== props.$index ? "white" : "navy")};
`;

export const UpcomingFooter = styled.div`
  width: auto;
  /* height: 1rem; */
  display: flex;
  .link{
    width:auto;
    height: 1rem;
    font-size:1rem;
    justify-content: center;
    text-align: center;
    font-weight:1000;
    color: white;
  }
`;