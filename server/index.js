const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const root = require('./src/graphql/resolvers');
const schema = require('./src/graphql/schemas');
const PORT = 8081;
const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
