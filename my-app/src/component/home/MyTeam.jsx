import styled from "styled-components";
import {
  BORDER_RADIUS_20,
  HANYANG_COLOR,
  SHADOW,
  WIDTH
} from "../../constants/styleconstant";
import Upcoming from "./Upcoming";
import { useSelector } from "react-redux";
import { gql, useQuery } from "@apollo/client";

const TEAMINFO = gql`
  query ($team_id: Int!) {
    teamInfo(team_id : $team_id) {
    team_name
    department
    founding_year
    league
    current_rank
    played
    wins
    draws
    losses
    recentMatches{
      match_id
      match_date
      team1_id
      team2_id
      team1_score
      team2_score
      team1_name
      team2_name
    }
    upcomingMatches{
      match_id
      match_date
      team1_id
      team2_id
      team1_score
      team2_score
      team1_name
      team2_name
    }
    topScorers{
      name
      goals
    }
    members{
      name
      position
      student_number
      jersey_number
    }
    lastFormation{
        formation
        starting_players
      }
    }
  }
`;

const MyTeam = () => {
  const team_id = useSelector((state) => state.user.value).team_id;

  const { loading, error, data } = useQuery(TEAMINFO, {
    variables: { team_id: team_id }
  });

  const myTeamData = !loading && data.teamInfo;

  return (
    <MyTeamWrapper>
      <TeamName style={{ alignItems: 'end' }}>
        <div>My Team</div>
        <div className="name">{myTeamData.team_name}</div>
      </TeamName>
      <Wrapper>
        <TeamImage src={`/image/${team_id}.jpg`} alt={myTeamData.team_name} />
      </Wrapper>
      <Wrapper style={{ justifyContent: 'start' }}>
        <LeagueInfo>
          <div className="league-type">{myTeamData.league}</div>
          {/* <span className="rank">{myTeamData.team_name}</span> */}
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