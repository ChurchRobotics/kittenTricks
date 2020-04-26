module.exports = {
  client: {
    includes: [
      './src/datagraph/**/*.{ts,tsx}',
      './src/graphql/**/*.{ts,tsx}',
    ],
    service: {
      name: 'fullstack-tutorial',
      url: 'http://localhost:4000/graphql',
    },
  }
};
