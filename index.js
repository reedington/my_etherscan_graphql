// Import ApolloServer class from apollo-server
const { ApolloServer } = require("apollo-server");

// Import importSchema function to load schema from .graphql files
const { importSchema } = require("graphql-import"); 

// Import EtherDataSource class 
const EtherDataSource = require("./datasource/ethDatasource");

// Load schema from schema.graphql file
const typeDefs = importSchema("./schema.graphql"); 

// Load environment variables from .env file
require("dotenv").config();

// Resolver map
const resolvers = {
  Query: {
    // Resolver for etherBalanceByAddress query
    etherBalanceByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),

    // Resolver for totalSupplyOfEther query    
    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),

    // Resolver for latestEthereumPrice query
    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),

    // Resolver for blockConfirmationTime query
    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

// Create ApolloServer instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  
  // DataSource map
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Disable response timeouts
server.timeout = 0;

// Start the server
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
