import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { load_teams } from '../redux/teams';

const TEAMS = gql`
  query {
    teams {
      team_id
      team_name
      wins
      draws
      losses
      department
      founding_year
      current_rank
      team_code
      league
      played
    }
  }
`;

const useTeamData = () => {
  const [teamData, setTeamData] = useState(null);
  const { data } = useQuery(TEAMS);
  const dispatch = useDispatch();

  useEffect(() => {
    setTeamData(data);
  }, [])

  return { teams: teamData };
}

export default useTeamData;