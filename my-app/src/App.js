import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Ranking from "./component/rank/Ranking";
import Schedule from "./component/schedule/Schedule";
import Squad from "./component/Squad"
import Register from "./component/register/Register"
import Login from "./component/login/Login";
import Home from "./component/home/Home";
import Team1 from './component/team_pages/team1';


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
          <Route path="/team1" element={<Team1 />}></Route>
        </Route>
      </Routes>
      
      <footer>HY_Kick</footer>
    </>
  );
}

export default App;
