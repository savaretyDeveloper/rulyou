'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const [results] = await queryInterface.sequelize.query(
            'SELECT COUNT(*) AS count FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = "roles";'
        );

        if (results[0].count === 0) {
            throw new Error('Table roles does not exist. Create this table before run migration');
        }

        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            full_name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            efficiency: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    min: 0,
                    max: 100
                }
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'roles',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.fn('NOW')
            }
        });

        await queryInterface.bulkInsert('users', [
            {
                full_name: 'John Doe',
                efficiency: 85,
                role_id: 1
            },
            {
                full_name: 'Jane Smith',
                efficiency: 92,
                role_id: 3
            }
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('users');
    }
};
