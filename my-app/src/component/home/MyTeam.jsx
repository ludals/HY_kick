import styled from "styled-components";
import {
  BORDER_RADIUS_20,
  HANYANG_COLOR,
  SHADOW,
  WIDTH
} from "../../constants/styleconstant";
import Upcoming from "./Upcoming";

const MyTeam = ({ teamName = "개발", src = "/image/gaebal.jpg", leagueType = "선봉리그", rank = 1 }) => {
  return (
    <MyTeamWrapper>
      <TeamName style={{ alignItems: 'end' }}>
        <div>My Team</div>
        <div className="name">{teamName}</div>
      </TeamName>
      <Wrapper>
        <TeamImage src={src} alt={teamName} />
      </Wrapper>
      <Wrapper style={{ justifyContent: 'start' }}>
        <LeagueInfo>
          <div className="league-type">{leagueType}</div>
          <span className="rank">{rank}</span>
          <span> 위</span>
        </LeagueInfo>
      </Wrapper>
      <Wrapper>
        <Upcoming>

        </Upcoming>
      </Wrapper>


    </MyTeamWrapper>
  );
};

export default MyTeam;

const MyTeamWrapper = styled.div`
  width: calc(${WIDTH});
  height: calc(${WIDTH} / 8 * 4);
  box-sizing: border-box;
  padding: 1rem 2rem;
  background-color: ${HANYANG_COLOR.BLUE};
  border-radius: ${BORDER_RADIUS_20};
  box-shadow: ${SHADOW};
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 3fr;
  grid-template-areas:
  "name name blank"
  "image league schedule";
  >:nth-child(1){
    grid-area: name;
  }
  >:nth-child(2){
    grid-area: image;
  }
  >:nth-child(3){
    grid-area: league;
    padding-left: 1rem;
  }
  >:nth-child(4){
    grid-area: schedule;
    padding-left: 1rem;
  }
`;

const TeamName = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 1rem;
  color: white;
  font-weight: 700;
  letter-spacing: 3px;
  .name{
    font-size: 1.5rem;
  }
`;

const TeamImage = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LeagueInfo = styled.div`
  text-align: center;
  font-weight: 700;
  font-size: 1rem;
  color: white;
  letter-spacing: 3px;
  .rank{
    font-size: 2rem;
  }
  .league-type{
    margin-bottom: 0.5rem;
  }
`;