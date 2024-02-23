import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Formation from '../formation/Formation';
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR,
  WIDTH
} from "../../constants/styleconstant";

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { dummyMatches, dummyScorers, dummyTeamPlayers } from './TeamDummy';
import TeamScorers from './TeamScorerRank';
import TeamPlayers from './TeamPlayerList';
import { Upcoming2Matches, Recent2Matches } from './TeamMatches';
export const TEAMINFO = gql`
query ($team_id: Int!) {
    teamInfo(team_id : $team_id) {
    team_name
    department
    founding_year
    league
    current_rank
    played
    wins
    draws
    losses
    recentMatches{
      match_id
      match_date
      team1_id
      team2_id
      team1_score
      team2_score
    }
    upcomingMatches{
      match_id
      match_date
      team1_id
      team2_id
      team1_score
      team2_score
    }
    topScorers{
      member_id
      name
      goals
    }
    members{
      member_id
      name
      position
      student_number
      jersey_number
    }
    lastFormation{
        formation
        starting_players
      }
    }
  }`;



const Team = ({ team, teamLogo, deptLogo }) => {
  //const [results, setResults] = useState(resultData);
  const [selectedNav, setSelectedNav] = useState('nav1'); //초기값

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };
  console.log("dddddd" + team.team_id);
  const { loading, error, data } = useQuery(TEAMINFO, {
          variables: { team_id: team.team_id }
  });
  //const { teamInfo } = data;
  return(
  <TeamCard>
    <TeamContent>
      <FirstRow>
      <TeamLogo src={teamLogo} alt="팀 로고" />
      <TeamInfo>
        <TeamName>{team.team_name}</TeamName> {/*teamInfo.team_name */}
        <TeamDescription>team.department</TeamDescription>{/* back */}
        <TeamDescription>창설년도: 2020</TeamDescription>{/* back */}
      </TeamInfo>
      </FirstRow>
      {/* <SecondRow>
      <TeamLogo src={deptLogo} alt="학과 이미지" />
    <TeamHistory history="2022년 공대스리가 우승, 2021년 공대스리가 3위, 2020년 공대스리가 5위" />
    </SecondRow> */}
    </TeamContent>
    <SeasonCard>
        <LeagueName>{team.league}</LeagueName>{/* back {leagueName} */}
        <CurrentRank>현재 순위: {team.current_rank}</CurrentRank>{/* back 현재 순위: {currentRank}위*/}
      <Spacer />
        <SeasonPerformance>{team.played}경기 {team.wins}승 {team.draws}무 {team.losses}패</SeasonPerformance>{/* back {game}경기 {win}승 {draw}무 {lose}패*/}
        <Recent5Performance results={['W', 'W', 'W', 'D', 'L']} />
    </SeasonCard>
    <DetailCard>
        <Navigation>
          <NavItem
            onClick={() => handleNavClick('nav1')}
            selected={selectedNav === 'nav1'}
          >
            다가오는 일정
          </NavItem>
          <NavItem
            onClick={() => handleNavClick('nav2')}
            selected={selectedNav === 'nav2'}
          >
            최근 경기 결과
          </NavItem>
          <NavItem
            onClick={() => handleNavClick('nav3')}
            selected={selectedNav === 'nav3'}
          >
            득점 순위
          </NavItem>
          <NavItem
            onClick={() => handleNavClick('nav4')}
            selected={selectedNav === 'nav4'}
          >
            선수 명단
          </NavItem>
        </Navigation>
        <CardWrapper>
        {selectedNav === 'nav1' && <Upcoming2Matches matches = {dummyMatches}/>}
        {selectedNav === 'nav2' && <Recent2Matches matches = {dummyMatches}/>}
        {selectedNav === 'nav3' && <TeamScorers scorers={dummyScorers}/>}
        {selectedNav === 'nav4' && <TeamPlayers players={dummyTeamPlayers}/>}
      </CardWrapper>
      </DetailCard>
      <Spacer/>
      <Formation formation="4-4-2" players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']} />
  </TeamCard>
);};
export default Team


const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  //width: 100%; 
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  margin: 0 auto; 
`;
//팀 정보
const TeamContent = styled.div`
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
const FirstRow = styled.div`
  display: flex;
  gap: 20px;
`;

const SecondRow = styled.div`
  display: flex;
  gap: 20px;
`;

const TeamLogo = styled.img`
  max-width: 100px;
  max-height: 100px;
  border-radius: 50%;
  border: 2px solid #ddd;
  padding: 1px;
`;

const TeamName = styled.h3`
  margin: 10px 0;
`;

const TeamDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #333;
`;

const TeamInfo = styled.div`
  border: 0px solid #ddd;
  flex: 1;
  padding-left: 10px;
  padding-right: 15px;
  text-align: left;
`;
//이번 시즌 성적
const SeasonCard = styled.div`
  
  border: 1px solid #ddd;
  //background-color: #f7f7f7;
  text-align: center;
  margin-top: 10px;
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
  width: ${WIDTH};
  align-items: center;
`;

const LeagueName = styled.h4`
  margin: 20px 0px;
  font-size: 18px; 
`;

const CurrentRank = styled.p`
  font-weight: bold;
  font-size: 16px;
  display: inline;
`;

const SeasonPerformance = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  display: inline;
`;

const Recent5Performance = ({ results }) => {
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


const CircleText = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

const Recent5PerformanceWrapper = styled.div`
  padding: 30px 50px;
  display: flex;
  justify-content: space-between;
`;

const RecordCircle = styled.div`
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

const Spacer = styled.span`
  margin: 10px;
`;
//역대 전적
const TeamHistoryCard = styled.div`
width: calc(100% - 120px);
border: 0px solid #ddd;
padding: 0px;
padding-left: 10px;
padding-bottom: 0px;
text-align: left;
`;

const TeamHistoryTitle = styled.h3`
margin: 0;
font-size: 14px;
`;

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin-top: 5;
`;

const HistoryItem = styled.li`
  font-size: 14px;
  margin-bottom: 2px;
`;

const TeamHistory = ({ history }) => {
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

const DetailCard = styled.div`
  background-color: '#f0f0f0';
  border: 1px solid #ddd;
  margin-top:10px;
  width: ${WIDTH};
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-radius: ${BORDER_RADIUS_20};
`;

const NavItem = styled.div`
color: black;
padding: 10px;
cursor: pointer;
font-size: 12px;
background-color: ${props => (props.selected ? '#f0f0f0' : 'transparent')};
border-radius: ${BORDER_RADIUS_20};
overflow-y: auto;
`;

const CardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
`;

