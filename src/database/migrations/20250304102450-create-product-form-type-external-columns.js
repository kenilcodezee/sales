'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.sequelize.query(`
            CREATE TYPE enum_product_form_type_external_columns_form_type AS ENUM ('PURCHASE')
        `);

        await queryInterface.createTable('product_form_type_external_columns', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4(),
                primaryKey: true,
            },
            form_type: {
                type: Sequelize.ENUM('PURCHASE'),
                allowNull: false,
            },
            product_type_external_column_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'product_type_external_columns',
                    key: 'id',
                },
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('product_form_type_external_columns');
        await queryInterface.sequelize.query(
            'DROP TYPE enum_product_form_type_external_columns_form_type',
        );
    },
};
