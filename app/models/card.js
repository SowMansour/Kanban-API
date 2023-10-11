const { Model, DataTypes } = require('sequelize');
const getConnexion = require('./getConnexion');

class Card extends Model {}

Card.init(
    {
        content: {
            type: DataTypes.TEXT,
        },

        color: {
            type: DataTypes.TEXT,
        },

        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        position: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize: getConnexion(),
        modelName: 'Card',
        tableName: 'card',
    }
);

module.exports = Card;