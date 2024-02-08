import { Link } from "react-router-dom";
import Allteam from "../teams.json";
import {
  MenuWrapper,
  MenuItem,
  Image,
  RankSection,
  LeagueRank,
  LeagueType
} from "./MenuStyle"

const Menu = () => {
  const teams = [Allteam.sunbong, Allteam.gongde];
  return (
    <MenuWrapper>
      <MenuItem style={{ width: '100%' }}>
        <Link to="/ranking">
          <Image src="/image/gotoRight.png" alt="" />
        </Link>
        {
          teams.map((team, index) => {
            return (
              <RankSection key={`${team.name}${index}`}>
                <LeagueType>{index === 0 ? "선봉리그" : "공대리그"}</LeagueType>
                {
                  team.slice(0, 3).map((team, index) => {
                    return (
                      <LeagueRank key={`${team}${index}`}>
                        <div>{index + 1}</div>
                        <div>
                          <img src="/image/gaebal.jpg" alt="" />
                          {team.name}
                        </div>
                      </LeagueRank>
                    );
                  })
                }
              </RankSection>
            );
          })
        }
      </MenuItem>
      <MenuItem>
        <Link to="/schedule">
          <Image src="/image/gotoRight.png" alt="" />
        </Link>
        <LeagueType>리그 일정/결과</LeagueType>
      </MenuItem>
      <MenuItem>
        <Link to="/gaebal">
          <Image src="/image/gotoRight.png" alt="" />
        </Link>
        <LeagueType>Team Page </LeagueType>
      </MenuItem>
    </MenuWrapper>
  );
};

export default Menu;