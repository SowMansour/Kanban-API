const { Model, DataTypes, literal } = require('sequelize');
const getConnexion = require('./getConnexion');

class List extends Model {}

List.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER,
        },
    },
    {
        // obligatoire : une instance de sequelize qui peut se connecter à la BDD
        sequelize: getConnexion(),
        modelName: 'List',
        tableName: 'list',
    }
);

module.exports = List;