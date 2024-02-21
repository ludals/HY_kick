import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  return (
    <MenuWrapper>
      <MenuItem style={{ width: '100%' }} onClick={() => { navigate('/rank') }}>
        <Image src="/image/gotoRight.png" alt="" />
        {/* {
          teams.map((team, idx) => {
            return (
              <RankSection key={`${team.name}${idx}`}>
                <LeagueType>{idx === 0 ? "선봉리그" : "공대리그"}</LeagueType>
                {
                  team.slice(0, 3).map((team, index) => {
                    return (
                      <LeagueRank key={`${team}${index}`} $idx={idx} $index={index}>
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
        } */}
      </MenuItem>
      <MenuItem onClick={() => { navigate('/schedule') }}>
        <Image src="/image/gotoRight.png" alt="" />
        {/* <LeagueType>리그 일정/결과</LeagueType> */}
      </MenuItem>
      <MenuItem onClick={() => { navigate('/team/1') }}> {/* /team/user.team_id */}
        <Image src="/image/gotoRight.png" alt="" />
        {/* <LeagueType>Team Page </LeagueType> */}
      </MenuItem>
    </MenuWrapper>
  );
};

export default Menu;