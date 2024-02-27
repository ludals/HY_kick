import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { load_match } from '../redux/match';

const MATCHES = gql`
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
  const { data } = useQuery(MATCHES);
  const dispatch = useDispatch();
  dispatch(load_match(data));
}

export default useTeamData;