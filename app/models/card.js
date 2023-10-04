const { Model, DataTypes } = require('sequelize');
const getConnexion = require('./getConnexion');

class Card extends Model {}

Card.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER,
        },
        color: {
            type: DataTypes.TEXT,
        },
        content: {
            type: DataTypes.TEXT,
        },
        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize: getConnexion(),
        modelName: 'Card',
        tableName: 'card',
    }
);

module.exports = Card;