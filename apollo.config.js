module.exports = {
  client: {
    includes: [
      './src/graph/**/*.{ts,tsx}',
      './src/queries/**/*.{ts,tsx}',
    ],
    service: {
      name: 'fullstack-tutorial',
      url: 'http://localhost:4000/graphql',
    },
  }
};
