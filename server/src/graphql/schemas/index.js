const { buildSchema } = require('graphql');
const teamSchema = require('./teamSchema');

const schema = buildSchema(`
  ${teamSchema}
  
  type Query {
    // Query definitions...
  }

  type Mutation {
    // Mutation definitions...
  }
`);

module.exports = schema;