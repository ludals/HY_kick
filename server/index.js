const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('./db');
const axios = require('axios');

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
  position: String
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

type KakaoAuthResponse {
  accessToken: String
  refreshToken: String
  expiresIn: Int
  tokenType: String
  scope: String
  userId: Int
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

type Mutation {
  authenticateWithKakao(authorizationCode: String!): KakaoAuthResponse
}

`);

const root = {
  teams: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM teams', (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  team: ({ team_id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM teams WHERE team_id = ?', [team_id], (error, results) => {
        if (error) reject(error);
        else resolve(results[0]);
      });
    });
  },
  members: ({ team_id }) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM members WHERE team_id = ?', [team_id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },
  authenticateWithKakao: async ({ authorizationCode }) => {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'authorization_code');
      params.append('client_id', 'YOUR_CLIENT_ID'); // 카카오 앱 REST API 키
      params.append('redirect_uri', 'YOUR_REDIRECT_URI'); // 카카오 개발자 콘솔에 등록한 리디렉트 URI
      params.append('code', authorizationCode);

      // 카카오로부터 액세스 토큰 요청
      const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', params);
      const { access_token, refresh_token, expires_in, token_type, scope } = tokenResponse.data;

      // 액세스 토큰으로 카카오 API를 통해 사용자 정보 요청
      const userInfoResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const userId = userInfoResponse.data.id; // 카카오 사용자 고유 ID

      return {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        tokenType: token_type,
        scope: scope,
        userId: userId,
      };
    } catch (error) {
      console.error('Error during Kakao authentication:', error);
      throw new Error('Failed to authenticate with Kakao');
    }
  },
  teamInfo: async ({ team_id }) => {
    try {
      const teamResults = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM teams WHERE team_id = ?', [team_id], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
      
      const team = teamResults[0];
      if (!team) throw new Error("Team not found");
  
      const membersResults = await new Promise((resolve, reject) => {
        db.query('SELECT * FROM members WHERE team_id = ?', [team_id], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
      team.members = membersResults;
  
      const recentMatchesResults = await new Promise((resolve, reject) => {
        db.query(`
        SELECT m.*, mr.team1_score, mr.team2_score
        FROM matches m
        LEFT JOIN match_records mr ON m.match_id = mr.match_id
        WHERE m.team1_id = ? OR m.team2_id = ?
        ORDER BY m.match_date DESC LIMIT 2
      `, [team_id, team_id], (error, results) => {
        if (error) reject(error);
        else resolve(results);
        });
      });
      team.recentMatches = recentMatchesResults.map(match => ({
        ...match,
        match_date: new Date(match.match_date).toISOString()
      }));
  
      const upcomingMatchesResults = await new Promise((resolve, reject) => {
        db.query(`
          SELECT * FROM matches 
          WHERE (team1_id = ? OR team2_id = ?) AND match_date > NOW()
          ORDER BY match_date ASC LIMIT 2
        `, [team_id, team_id], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
      team.upcomingMatches = upcomingMatchesResults.map(match => ({
        ...match,
        match_date: new Date(match.match_date).toISOString()
      }));
  
      const lastMatchResults = await new Promise((resolve, reject) => {
        db.query(`
          SELECT match_id FROM matches
          WHERE team1_id = ? OR team2_id = ?
          ORDER BY match_date DESC LIMIT 1
        `, [team_id, team_id], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
  
      if (lastMatchResults.length > 0) {
        const formationResults = await new Promise((resolve, reject) => {
          db.query(`
            SELECT * FROM lineups
            WHERE match_id = ?
          `, [lastMatchResults[0].match_id], (error, results) => {
            if (error) reject(error);
            else resolve(results);
          });
        });
        team.lastFormation = formationResults[0] || null;
      }

      const topScorersResults = await new Promise((resolve, reject) => {
        db.query(`
          SELECT m.member_id, m.name, COUNT(g.goal_id) AS goals
          FROM members m
          LEFT JOIN goals g ON m.member_id = g.scorer_id
          WHERE m.team_id = ?
          GROUP BY m.member_id
          ORDER BY goals DESC
        `, [team_id], (error, results) => {
          if (error) reject(error);
          else resolve(results);
        });
      });
      team.topScorers = topScorersResults;
  
      return team;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

const app = express();
const PORT = 8081;

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000', // 허용할 도메인
  credentials: true, // 필요한 경우 (쿠키 전송을 위해)
}));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
