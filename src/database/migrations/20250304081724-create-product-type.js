'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('product_types', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
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
        await queryInterface.dropTable('product_types');
    },
};
