'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'product_type_external_columns_table_names',
            {
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
                purchase: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                },
            },
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable(
            'product_type_external_columns_table_names',
        );
    },
};
