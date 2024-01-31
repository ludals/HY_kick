import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Tab from "../component/rank/Tab";
import RankTable from "../component/rank/RankTable";
import { LEAGUE_TYPE1 } from "../constants/constant";

const RankingPage = () => {
  const [leagueType, setLeagueType] = useState(LEAGUE_TYPE1);
  const teams = useSelector((state) => state.ranking.value)
  const teamDatas = (leagueType === LEAGUE_TYPE1 ? teams.ranking.sunbong : teams.ranking.gongde);

  return (
    <RankingLayout>
      <Tab
        leagueType={leagueType}
        setLeagueType={setLeagueType}
      />
      <RankTable
        teamDatas={teamDatas}
      />
    </RankingLayout>
  );
};

export default RankingPage;

const RankingLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;