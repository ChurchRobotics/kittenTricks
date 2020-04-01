module.exports = {
  client: {
    includes: [
      './src/store/**/*.{ts,tsx}',
      './src/queries/**/*.{ts,tsx}',
    ],
    service: {
      name: 'fullstack-tutorial',
      url: 'http://localhost:4000/graphql',
    },
  }
};
