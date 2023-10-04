const { Model, DataTypes } = require('sequelize');
const getConnexion = require('./getConnexion');

class Tag extends Model {}

Tag.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        color: {
            type: DataTypes.TEXT,
        },
    },
    {
        // obligatoire : une instance de sequelize qui peut se connecter à la BDD
        sequelize: getConnexion(),
        modelName: 'Tag',
        tableName: 'tag',
    }
);

module.exports = Tag;