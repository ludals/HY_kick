const teamSchema = `
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
`;

module.exports = teamSchema;
