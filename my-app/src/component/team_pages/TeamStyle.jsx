import React, { useState } from 'react';
import styled from "styled-components";
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR,
  WIDTH
} from "../../constants/styleconstant";

export const TeamView = ({ teamName }) => {
  //imagePath = teamName === "개발" ? `/image/gaebal.jpg` : teamName === "AUSOC" ? '/image/ausoc.jpg' : ... 
  const imagePath = `/image/gaebal.jpg`;
  return (
    <>
      <TeamViewWrapper>
        <img
          src={imagePath}
          alt=""
        />
      </TeamViewWrapper>
    </>
  );
}

export const TeamViewWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  >img{
    width: calc(${WIDTH} / 4);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center; 
  }
`;

export const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //width: 100%; 
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  margin: 0 auto; 
`;

export const TeamContent = styled.div`
  border: 1px solid #ddd;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap:20px;
  flex-wrap: wrap;
  flex: 1; 
  margin-top: 20px;
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
  width: ${WIDTH};
  align-items: center;
`;
export const FirstRow = styled.div`
  display: flex;
  gap: 20px;
`;

export const TeamName = styled.h3`
  margin: 10px 0;
`;

export const TeamDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

export const TeamInfo = styled.div`
  border: 0px solid #ddd;
  flex: 1;
  padding-left: 10px;
  padding-right: 15px;
  text-align: left;
`;
//이번 시즌 성적
export const SeasonCard = styled.div`
  border: 1px solid #ddd;
  //background-color: #f7f7f7;
  text-align: center;
  margin-top: 10px;
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
  width: ${WIDTH};
  align-items: center;
`;

export const LeagueName = styled.h4`
  margin: 20px 0px;
  font-size: 18px; 
`;

export const CurrentRank = styled.p`
  font-weight: bold;
  font-size: 16px;
  display: inline;
`;

export const SeasonPerformance = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  display: inline;
`;

export const Recent5Performance = ({ results }) => {
  return (
    <Recent5PerformanceWrapper>
      {results.slice(0, 5).map((result, index) => (
        <RecordCircle key={index} result={result}>
          <CircleText>{result}</CircleText>
        </RecordCircle>
      ))}
    </Recent5PerformanceWrapper>
  );
};


export const CircleText = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

export const Recent5PerformanceWrapper = styled.div`
  padding: 30px 50px;
  display: flex;
  justify-content: space-between;
`;

export const RecordCircle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ result }) => {
    switch (result) {
      case 'W':
        return 'green';
      case 'D':
        return 'gray';
      case 'L':
        return 'red';
      default:
        return 'white';
    }
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
`;

export const Spacer = styled.span`
  margin: 10px;
`;
//역대 전적
export const TeamHistoryCard = styled.div`
width: calc(100% - 120px);
border: 0px solid #ddd;
padding: 0px;
padding-left: 10px;
padding-bottom: 0px;
text-align: left;
`;

export const TeamHistoryTitle = styled.h3`
margin: 0;
font-size: 14px;
`;

export const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin-top: 5;
`;

export const HistoryItem = styled.li`
  font-size: 14px;
  margin-bottom: 2px;
`;

export const TeamHistory = ({ history }) => {
  const historyItems = history.split(',');

  return (
    <TeamHistoryCard>
      <TeamHistoryTitle>역대 전적</TeamHistoryTitle>
      <HistoryList>
        {historyItems.map((item, index) => (
          <HistoryItem key={index}>{item.trim()}</HistoryItem>
        ))}
      </HistoryList>
    </TeamHistoryCard>
  );
};

//Details(Navigation Bar)

export const DetailCard = styled.div`
  background-color: '#f0f0f0';
  border: 1px solid #ddd;
  margin-top:10px;
  width: ${WIDTH};
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: ${BORDER_RADIUS_20};
`;

export const NavItem = styled.div`
font-weight: bold;
color: black;
padding: 10px;
cursor: pointer;
font-size: 12px;
background-color: ${props => (props.selected ? '#f0f0f0' : 'transparent')};
border-radius: ${BORDER_RADIUS_20};
overflow-y: auto;
`;

export const CardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
`;