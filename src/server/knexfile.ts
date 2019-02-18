// Update with your config settings.

module.exports = {
  client: 'postgresql',
  connection: 'postgresql://redox:redox@localhost:6432/redoxdb',
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    extension: ['js', 'ts']
  }
};
