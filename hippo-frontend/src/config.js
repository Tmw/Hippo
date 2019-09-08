const config = {
  development: {
    apiUrl: "http://localhost:4000/api/graphql",
    wsUrl: "ws://localhost:4000/api/socket"
  },

  production: {
    apiUrl: "/api/graphql",
    wsUrl: "/api/socket"
  }
};

const env = process.env.NODE_ENV || "development";
export default config[env];
