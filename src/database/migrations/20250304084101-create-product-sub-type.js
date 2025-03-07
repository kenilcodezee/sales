'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('product_sub_types', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
            },
            product_type_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'product_types',
                    key: 'id',
                },
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('product_sub_types');
    },
};
