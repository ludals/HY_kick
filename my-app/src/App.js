import React from "react";
import { Routes, Route } from "react-router-dom";
import RankingPage from "./pages/RankingPage";
import Schedule from "./component/schedule/Schedule";
import SquadMaker from "./component/Squadmaker";
import Register from "./component/register/Register"
import ResultPage from "./pages/ResultPage";
import Auth from "./component/auth/Auth"
import Home from "./pages/HomePage";
import Team from './component/team_pages/Team';
import gaeballogo from './component/team_image/gaebal.jpg';
import cselogo from './component/dept_image/cse.jpg';
import Formation from './component/formation/Formation';
import Splash from "./pages/Splash";

import matches from "../src/component/matches.json"
import teams from "../src/component/teams.json"
import { useDispatch, useSelector } from "react-redux";
import { load_match } from "../src/redux/match";
import { load_teams } from "./redux/teams"
import Header from "./component/Header";

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
export const TEAMS = gql`
  query {
    teams {
      team_id
      team_name
      wins
      draws
      losses
      department
      founding_year
      current_rank
      team_code
      league
      played
    }
  }
`;

function App() {
  const { data } = useQuery(TEAMS);
  const dispatch = useDispatch();
  dispatch(load_teams(data));

  return (
    <>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/rank" element={<RankingPage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/squadmaker" element={<SquadMaker formation="포메이션" players={['민지우', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/result/:id" element={<ResultPage />} />
        {data && data.teams.map(team => (
          <Route
            key={team.team_id}
            path={`/team/${team.team_id}`}
            element={<Team team={team} teamLogo={team.team_id === 1 ? gaeballogo : cselogo} deptLogo={cselogo} />}
          />
        ))}

        {/* 선봉리그 */}
        {/* <Route path="/gaebal" element={<Team teamName="개발" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/maepung" element={<Team teamName="메풍" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/junsa" element={<Team teamName="전사" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/socc3" element={<Team teamName="SOCC3" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/alssa" element={<Team teamName="알싸" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/hyus" element={<Team teamName="HYUS" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/ufc" element={<Team teamName="UFC" teamLogo={gaeballogo} deptLogo={cselogo} />} /> */}
        {/* 공대리그 */}
        {/* <Route path="/shootang" element={<Team teamName="슈탱" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/ausoc" element={<Team teamName="AUSOC" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/hymse" element={<Team teamName="HYMSE" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/sinhwa" element={<Team teamName="신화" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/foryou" element={<Team teamName="포유" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/lala" element={<Team teamName="LALA" teamLogo={gaeballogo} deptLogo={cselogo} />} />
        <Route path="/hyulshe" element={<Team teamName="혈쉬" teamLogo={gaeballogo} deptLogo={cselogo} />} /> */}

        <Route path="/formation" element={<Formation formation="4-2-3-1" players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']} isResult={false} />} />
      </Routes>
    </>
  );
}

export default App;
