const db = require('../../../db');

const queryResolvers = {
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
            SELECT m.*, mr.team1_score, mr.team2_score,
            t1.team_name AS team1_name, 
            t2.team_name AS team2_name
     FROM matches m
     JOIN match_records mr ON m.match_id = mr.match_id
     JOIN teams t1 ON m.team1_id = t1.team_id
     JOIN teams t2 ON m.team2_id = t2.team_id
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
          SELECT m.*, 
                 t1.team_name AS team1_name, 
                 t2.team_name AS team2_name
          FROM matches m
          JOIN teams t1 ON m.team1_id = t1.team_id
          JOIN teams t2 ON m.team2_id = t2.team_id
          WHERE (m.team1_id = ? OR m.team2_id = ?) AND m.match_date > NOW()
          ORDER BY m.match_date ASC LIMIT 2
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

module.exports = queryResolvers;