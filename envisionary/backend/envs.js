const { config } = require( 'dotenv');

config();

module.exports = {
    port: process.env.PORT || 3000,
    graphqlPath: process.env.GRAPHQL_PATH || '/graphql',
}