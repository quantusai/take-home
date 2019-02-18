// Update with your config settings.

const env = process.env.NODE_ENV || '';
const address = env === 'development' ? 'postgres:5432' : 'localhost:6432'
module.exports = {
  client: 'pg',
  connection: `postgresql://redox:redox@${address}/redoxdb`,
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    extension: ['js', 'ts']
  }
};
