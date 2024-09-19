'use strict';

const {DataTypes} = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('roles', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        });

        await queryInterface.bulkInsert('roles', [
            {name: 'работник'},
            {name: 'гость'},
            {name: 'администратор'}
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('roles');
    }
};
