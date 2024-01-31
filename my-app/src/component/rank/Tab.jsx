import { TabWrapper } from "./TabStyle";
import {
  LEAGUE_TYPE1,
  LEAGUE_TYPE2
} from "../../constants/constant";

const Tab = ({ leagueType, setLeagueType }) => {
  return (
    <TabWrapper>
      <div
        onClick={() => { setLeagueType(LEAGUE_TYPE1) }}
        className={leagueType === LEAGUE_TYPE1 ? "active" : "x"}
      >
        {LEAGUE_TYPE1}
      </div>
      <div
        onClick={() => { setLeagueType(LEAGUE_TYPE2) }}
        className={leagueType === LEAGUE_TYPE2 ? "active" : "x"}
      >
        {LEAGUE_TYPE2}
      </div>
      {/* <nav>
        <div className="tabs">
          <ul className="tablist">
            <li onClick={() => changeTable("선봉리그")} className={isSunbong ? "active" : ""}>선봉리그</li>
            <li onClick={() => changeTable("공대리그")} className={(!isSunbong) ? "active" : ""}>공대리그</li>
          </ul>
        </div>
      </nav> */}
    </TabWrapper>
  );
};

export default Tab;