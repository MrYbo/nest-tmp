export default () => ({
  database: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '12345678',
    dbName: 'huitest',
    charset: 'utf8',
    collation: 'utf8_general_ci',
    debug: true,
  },

  redis: {
    host: '127.0.0.1',
    port: 6379,
    keyPrefix: 'test-aa:',
  },

  jwt: {
    secret: 'secretKey',
    expiresIn: '2h',
  },
});
