import { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Tab from "../component/rank/Tab";
import RankTable from "../component/rank/RankTable";
import { LEAGUE_TYPE1 } from "../constants/constant";
import {
  BORDER_RADIUS_20,
  BACKGROUND_COLOR,
  MARGIN_TOP
} from "../constants/styleconstant";
import Header from "../component/Header";

const RankingPage = () => {
  const [leagueType, setLeagueType] = useState(LEAGUE_TYPE1);
  const teams = useSelector((state) => state.teams.value)
  const teamDatas = (leagueType === LEAGUE_TYPE1 ? teams.ranking.sunbong : teams.ranking.gongde);

  return (
    <>
      <Header />
      <RankingLayout>
        <RankTableContainer>
          <Tab
            leagueType={leagueType}
            setLeagueType={setLeagueType}
          />
          <RankTable
            teamDatas={teamDatas}
          />
        </RankTableContainer>
      </RankingLayout>
    </>
  );
};

export default RankingPage;

const RankingLayout = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: ${MARGIN_TOP};
`;

const RankTableContainer = styled.div`
  border-radius: ${BORDER_RADIUS_20};
  background-color: ${BACKGROUND_COLOR};
`;