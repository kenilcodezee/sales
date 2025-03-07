'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('product_type_external_columns', {
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
            field_name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            display_name: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            data_type: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            input_type: {
                type: Sequelize.STRING(45),
                allowNull: false,
            },
            is_required: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
            },
            display_order: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('product_type_external_columns');
    },
};
