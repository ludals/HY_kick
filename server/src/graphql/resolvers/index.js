const  queryResolvers = require('./query');
const mutationResolvers = require('./mutation');

const root = {
  ...queryResolvers,
  ...mutationResolvers,
};

module.exports = root;