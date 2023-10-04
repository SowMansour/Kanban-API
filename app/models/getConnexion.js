const Sequelize = require('sequelize');

function getConnexion() {
    const sequelize = new Sequelize(
        process.env.PG_URL,
        {
            define: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            },
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
        }
    );

    return sequelize;
}

module.exports = getConnexion;