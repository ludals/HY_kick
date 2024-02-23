import styled from "styled-components";
import {
  HANYANG_COLOR,
} from "../../constants/styleconstant";

export const Container = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 8px 50px;
`;

export const Name = styled.span`
  font-weight: bold;
`;

export const Content = styled.span`
  color: #000000;
`;

export const PresidentText = styled.span`
  color: #ff0000; //${HANYANG_COLOR}
  font-weight: bold;
  display: inline-block;
  border-radius: 30%;
  background-color: #f0f0f0;
  padding-left: 4px;
  padding-right: 4px;
  margin-left : 20px;
`;

export const MatchWrapper = styled.div`
  margin-bottom: 20px;
`;

export const MatchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;