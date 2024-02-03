const env = require('./env.config');

const dbConfig = {
    username: env.PGSQL_USER,
    password: env.PGSQL_PASSWORD,
    database: env.PGSQL_DB,
    host: env.PGSQL_HOST,
    port: env.PGSQL_PORT,
    dialect: "postgres",
    define: {
      timestamps: true,
      freezeTableName: true
    },
    logging: false,
    migrationStorage: "sequelize",
    seederStorage: "sequelize",
    migrationStorageTableName: "SequelizeMigrations",
    seederStorageTableName: "SequelizeSeeds"
};

module.exports = dbConfig;
