const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./role');

class User extends Model {
}

User.init({
    full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    efficiency: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: false
});

User.belongsTo(Role, {foreignKey: 'role_id'});

module.exports = User;
