import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./component/Main";
import Ranking from "./component/Ranking";
import Schedule from "./component/Schedule";
import Squad from "./component/Squad"
import Team1 from './component/team_pages/team1';


function App() {
  return (
    <>
      <h1>HY_Kick</h1>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/squad" element={<Squad />} />
        <Route path="/team1" element={<Team1 />}></Route>
      </Routes>
    </>
  );
}

export default App;
