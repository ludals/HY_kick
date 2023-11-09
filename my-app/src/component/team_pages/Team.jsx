import React, { useState } from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import Formation from '../Formation';

//DB에서 최근 5경기 전적 가져옴(예: recent5result = ['W', 'D', 'L', 'W', 'D']) -> prop으로 넣음
{/* <Recent5Performance>
{recent5result.map((result, index) => (
  <RecordCircle key={index} result={result}>
    <CircleText>{result}</CircleText>
  </RecordCircle>
))}
</Recent5Performance> */}

const Team = ({ teamName, teamLogo, deptLogo }) => {
  //const [results, setResults] = useState(resultData);
  const [selectedNav, setSelectedNav] = useState('nav1'); //초기값

  const handleNavClick = (nav) => {
    setSelectedNav(nav);
  };
  return(
  <TeamCard>
    <DepartmentImage src={deptLogo} alt="학과 이미지" />
    <TeamContent>
      <TeamLogo src={teamLogo} alt="팀 로고" />
      <TeamInfo>
        <TeamName>{teamName}</TeamName>
        <TeamDescription>컴퓨터소프트웨어학부</TeamDescription>{/* back */}
        <TeamDescription>창설년도: 2020</TeamDescription>{/* back */}
      </TeamInfo>
    </TeamContent>
    <SeasonCard>
      <LeagueName>공대스리가</LeagueName>{/* back {leagueName} */}
      <CurrentRank>현재 순위: 1위</CurrentRank>{/* back 현재 순위: {currentRank}위*/}
      <Spacer />
      <SeasonPerformance>8경기 5승 2무 1패</SeasonPerformance>{/* back {game}경기 {win}승 {draw}무 {lose}패*/}
      <Recent5Performance>
        <RecordCircle>
          <CircleText>W</CircleText>
        </RecordCircle>
        <RecordCircle>
          <CircleText>W</CircleText>
        </RecordCircle>
        <RecordCircle>
          <CircleText>W</CircleText>
        </RecordCircle>
        <RecordCircle>
          <CircleText>D</CircleText>
        </RecordCircle>
        <RecordCircle>
          <CircleText>L</CircleText>
        </RecordCircle>
      </Recent5Performance>
    </SeasonCard>
    <TeamHistory history="2022년 공대스리가 우승, 2021년 공대스리가 3위, 2020년 공대스리가 5위" />
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
        {selectedNav === 'nav1' && <Upcoming2Matches />} {/* 네비게이션 1을 클릭했을 때 Upcoming2Matches 렌더링 */}
        {selectedNav === 'nav2' && <Recent2Matches />} {/* 네비게이션 2를 클릭했을 때 Recent2Matches 렌더링 */}
        {selectedNav === 'nav3' && <TeamScoreRank />} {/* 네비게이션 3를 클릭했을 때 TeamScoreRank 렌더링 */}
        {selectedNav === 'nav4' && <TeamSquad />} {/* 네비게이션 4를 클릭했을 때 TeamSquad 렌더링 */}
      </CardWrapper>
      </DetailCard>
      <Spacer/>
      <Formation formation="3-5-2" players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']} />
  </TeamCard>
);};
export default Team

const DepartmentImage = styled.img`
  max-width: 25%;
  height: auto;
`;

const TeamCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; 
  border: 1px solid #ddd;
  padding: 20px;
  text-align: center;
  margin: 0 auto; 
`;
//팀 정보
const TeamContent = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  padding-left: 63px;
  padding-right:63px;
  display: flex;
  align-items: center;
  flex: 1; 
  margin-top: 20px;
`;

const TeamLogo = styled.img`
  max-width: 100px;
  height: auto;
  border-radius: 50%;
  border: 2px solid #ddd;
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
  flex: 1;
  padding-left: 10px;
  text-align: left;
`;
//이번 시즌 성적
const SeasonCard = styled.div`
  border: 1px solid #ddd;
  background-color: #f7f7f7;
  padding-top: 20px;
  padding-left: 63px;
  padding-right:63px;
  text-align: left;
  margin-top: 10px;
`;

const LeagueName = styled.h4`
  margin: 0;
  font-size: 14px; 
`;

const CurrentRank = styled.p`
  margin: 0;
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

const Recent5Performance = styled.p`
  justify-content: center;
  display: flex;
  gap: 12px;
`;

const CircleText = styled.p`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin: 0;
`;

const RecordCircle = styled.div`
  background-color: #3498db;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;
// background-color: ${props => {
//   switch (props.result) {
//     case 'W':
//       return 'green';
//     case 'D':
//       return 'yellow';
//     case 'L':
//       return 'red';
//     default:
//       return 'transparent';
//   }
// }};
// color: ${props => (props.result === 'W' || props.result === 'L') ? 'white' : 'black'};

const Spacer = styled.span`
  margin: 10px;
`;
//역대 전적
const TeamHistoryCard = styled.div`
border: 1px solid #ddd;
padding: 20px;
padding-left: 114px;
padding-right:114px;
padding-bottom: 0px;
text-align: left;
margin-top: 10px;
margin-left: 10px; 
margin-right: 10px; 
`;

const TeamHistoryTitle = styled.h3`
margin: 0;
font-size: 14px;
`;

const HistoryList = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin-top: 10;
`;

const HistoryItem = styled.li`
  font-size: 14px;
  margin-bottom: 10px;
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
  padding: 10px;
  background-color: '#f0f0f0';
  border: 1px solid #ddd;
  margin-top:10px;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
`;

const NavItem = styled.div`
color: black;
padding: 10px;
cursor: pointer;
font-size: 12px;
background-color: ${props => (props.selected ? '#f0f0f0' : 'transparent')};
`;

const CardWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
`;

const Upcoming2Matches = () => (
  <div>
    <h2>다가오는 2 경기</h2>
    <p>Upcoming 2 Matches</p>
  </div>
);

const Recent2Matches = () => (
  <div>
    <h2>최근 2 경기 결과</h2>
    <p>Recent 2 Matches</p>
  </div>
);

const TeamScoreRank = () => (
  <div>
    <h2>팀 내 득점 순위</h2>
    <p>Team Score Ranking</p>
  </div>
);

const TeamSquad = () => (
  <div>
    <h2>팀 선수 명단</h2>
    <p>Team Squad</p>
  </div>
);
