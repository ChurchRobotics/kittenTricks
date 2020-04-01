module.exports = {
  client: {
    includes: [
      './src/queries/**/*.{ts,tsx}',
      './src/store/**/*.{ts,tsx}',
    ],
    service: {
      name: 'fullstack-tutorial',
      url: 'http://localhost:4000/graphql',
    },
  }
};
