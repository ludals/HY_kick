const { buildSchema } = require('graphql');
const schema = buildSchema(`
"""
팀 정보를 나타내는 타입입니다.
"""
type Team {
  """
  팀의 고유 식별자입니다.
  """
  team_id: Int

  """
  팀의 이름입니다.
  """
  team_name: String

  """
  팀의 승리 횟수입니다.
  """
  wins: Int

  """
  팀의 무승부 횟수입니다.
  """
  draws: Int

  """
  팀의 패배 횟수입니다.
  """
  losses: Int

  """
  팀이 속한 학과입니다.
  """
  department: String

  """
  팀이 창설된 년도입니다.
  """
  founding_year: Int

  """
  팀의 현재 순위입니다.
  """
  current_rank: Int

  """
  팀 코드입니다. 고유해야 합니다.
  """
  team_code: String

  """
  팀이 속한 리그입니다.
  """
  league: String

  """
  팀이 진행한 경기 수입니다.
  """
  played: Int

  """
  팀 멤버 목록입니다.
  """
  members: [Member]

  """
  팀의 최근 경기 정보입니다.
  """
  recentMatches: [Match]

  """
  팀의 다가오는 경기 정보입니다.
  """
  upcomingMatches: [Match]

  """
  팀의 마지막 경기 포메이션 정보입니다.
  """
  lastFormation: lineups

  """
  팀 내 득점 순위 정보입니다.
  """
  topScorers: [Scorer]
}

"""
포메이션 정보를 나타내는 타입입니다.
"""
type lineups {
  lineup_id: Int
  match_id: Int
  team_id: Int
  formation: String
  starting_players: String
  substitutes: String
}

"""
득점 순위 정보를 나타내는 타입입니다.
"""
type Scorer {
  member_id: Int
  name: String
  goals: Int
}

"""
팀 멤버 정보를 나타내는 타입입니다.
"""
type Member {
  member_id: Int
  name: String
  team_id: Int
  position: String
  student_number: String
  jersey_number: Int
}

"""
경기 정보를 나타내는 타입입니다.
"""
type Match {
  match_id: Int
  match_date: String
  team1_id: Int
  team2_id: Int
  team1_score: Int
  team2_score: Int
}

type UserAuthResponse {
  jwtToken: String
}

"""
쿼리 타입은 API를 통해 조회할 수 있는 데이터와 메서드를 정의합니다.
"""
type Query {
  teams: [Team]
  team(team_id: Int!): Team
  teamInfo(team_id: Int!): Team
  members(team_id: Int!): [Member]
  recentMatches(team_id: Int!): [Match]
  upcomingMatches(team_id: Int!): [Match]
}
input additionalInfo {
  name: String
  student_number: String
  team_code: String
  position: String
  jersey_number: Int
}

type Mutation {
  loginWithKakao(authorizationCode: String!): UserAuthResponse
  registerOrAuthenticateUser(
    authorizationCode: String!
    input: additionalInfo
  ): UserAuthResponse
}
`);

module.exports = schema;