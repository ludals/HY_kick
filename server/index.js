const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const db = require('./db');

const schema = buildSchema(`
  type Team {
    team_id: Int
    team_name: String
    wins: Int
    draws: Int
    losses: Int
    department: String
    founding_year: Int
    current_rank: Int
    team_code: String
    league: String
    played: Int
  }

  type Query {
    hello: String
    teams: [Team]
  }
`);

const root = {
    hello: () => 'Hello, World!',
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
  };

const app = express();
const PORT = 8081;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
