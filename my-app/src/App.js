import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Ranking from "./component/rank/Ranking";
import Schedule from "./component/schedule/Schedule";
import Squad from "./component/Squad";
import Register from "./component/register/Register"
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import Team from './component/team_pages/Team';
import teamlogo from './component/team_image/gaebal.jpg';
import deptlogo from './component/dept_image/cse.jpg';
import Formation from './component/Formation';

function App() {
  return (
    <>
      <h1>HY_Kick</h1>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/squad" element={<Squad />} />
          <Route path="/register" element={<Register />} />
          <Route path="/team" element={<Team teamName="개발" teamLogo={teamlogo} deptLogo={deptlogo}/>} />
          <Route path="/formation" element={<Formation formation="3-5-2" players={['이름1', '이름2', '이름3', '이름4', '이름5', '이름6', '이름7', '이름8', '이름9', '이름10', '이름11']} />} />
        </Route>
      </Routes>
      
      <footer>HY_Kick</footer>
    </>
  );
}

export default App;
