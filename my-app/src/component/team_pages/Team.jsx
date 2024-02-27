import React, { useState } from 'react';
import Formation from '../formation/Formation';
import {
  CardWrapper,
  NavItem,
  Navigation,
  DetailCard,
  TeamHistory,
  HistoryItem,
  HistoryList,
  TeamHistoryTitle,
  TeamHistoryCard,
  Spacer,
  RecordCircle,
  Recent5PerformanceWrapper,
  CircleText,
  Recent5Performance,
  SeasonPerformance,
  CurrentRank,
  LeagueName,
  SeasonCard,
  TeamInfo,
  TeamDescription,
  TeamName,
  FirstRow,
  TeamContent,
  TeamCard,
  TeamViewWrapper,
  TeamView
} from "./TeamStyle";

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
      team1_name
      team2_name
    }
    upcomingMatches{
      match_id
      match_date
      team1_id
      team2_id
      team1_score
      team2_score
      team1_name
      team2_name
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
  const [selectedNav, setSelectedNav] = useState('nav1');

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };
  const { loading, error, data } = useQuery(TEAMINFO, {
          variables: { team_id: team.team_id }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const teamInfo = data.teamInfo;
  return(
  <TeamCard>
    <TeamContent>
      <FirstRow>
      <TeamView teamName={teamInfo.team_name} />
      <TeamInfo>
        <TeamName>{teamInfo.team_name}</TeamName> 
        <TeamDescription>{teamInfo.department.split(',').join('\n')}</TeamDescription>
        <TeamDescription>{teamInfo.founding_year}</TeamDescription>
      </TeamInfo>
      </FirstRow>
      {/* <SecondRow>
      <TeamLogo src={deptLogo} alt="학과 이미지" />
    <TeamHistory history="2022년 공대스리가 우승, 2021년 공대스리가 3위, 2020년 공대스리가 5위" />
    </SecondRow> */}
    </TeamContent>
    <SeasonCard>
        <LeagueName>{teamInfo.league}</LeagueName>
        <CurrentRank>현재 순위: {teamInfo.current_rank}</CurrentRank>
      <Spacer />
        <SeasonPerformance>{teamInfo.played}경기 {teamInfo.wins}승 {teamInfo.draws}무 {teamInfo.losses}패</SeasonPerformance>{/* back {game}경기 {win}승 {draw}무 {lose}패*/}
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
          {selectedNav === 'nav1' && teamInfo.upcomingMatches.map(match => {
            const utcDate = new Date(match.match_date);
            const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
            const localTime = localDate.getHours();

            return (
              <Upcoming2Matches matches={[
                {
                  id: match.match_id,
                  date: localDate,
                  time: localTime,
                  teams: [
                    { name: match.team1_name, score: match.team1_score },
                    { name: match.team2_name, score: match.team2_score }
                  ],
                  referee: { name: "Referee Name", image: "/image/gaebal.jpg" }
                },
              ]} />
            );
          })}
        {selectedNav === 'nav2' && teamInfo.recentMatches.map(match => {
            const utcDate = new Date(match.match_date);
            const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
            const localTime = localDate.getHours();

            return (
              <Recent2Matches matches={[
                {
                  id: match.match_id,
                  date: localDate,
                  time: localTime,
                  teams: [
                    { name: match.team1_name, score: match.team1_score },
                    { name: match.team2_name, score: match.team2_score }
                  ],
                  referee: {image: "/image/gaebal.jpg" }
                },
              ]} />
            );
          })}
        {selectedNav === 'nav3' && <TeamScorers scorers={dummyScorers}/>}
        {selectedNav === 'nav4' && <TeamPlayers players={dummyTeamPlayers}/>}
      </CardWrapper>
      </DetailCard>
      <Spacer/>
      <Formation formation="4-4-2" players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']} />
  </TeamCard>
);};
export default Team


