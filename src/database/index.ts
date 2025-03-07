import logger from '@/utils/logger';
import Sequelize from 'sequelize';
import userModel from './models/user.model';
import {
    DB_DIALECT,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USERNAME,
    NODE_ENV,
} from '@/config';
import productTypeModel from './models/product-type.model';
import productSubTypeModel from './models/product-sub-type.model';
import purchaseModel from './models/purchase.model';
import productTypeExternalColumnModel from './models/product-type-external-column.model';
import productFormTypeExternalColumnModel from './models/product-form-type-external-column.model';
import productTypeExternalColumnsTableNamesModel from './models/product-type-external-columns-table-names.model';

const sequelize = new Sequelize.Sequelize(
    DB_NAME as string,
    DB_USERNAME as string,
    DB_PASSWORD,
    {
        dialect: (DB_DIALECT as Sequelize.Dialect) || 'postgres',
        host: DB_HOST,
        port: parseInt(DB_PORT as string, 10),
        timezone: '+09:00',
        define: {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            underscored: true,
            freezeTableName: true,
        },
        pool: {
            min: 0,
            max: 5,
        },
        logQueryParameters: NODE_ENV === 'development',
        logging: (query, time) => {
            logger.info(time + 'ms' + ' ' + query);
        },
        benchmark: true,
    },
);

sequelize.authenticate();

export const DB = {
    Users: userModel(sequelize),
    ProductType: productTypeModel(sequelize),
    ProductSubType: productSubTypeModel(sequelize),
    Purchase: purchaseModel(sequelize),
    ProductTypeExternalColumn: productTypeExternalColumnModel(sequelize),
    ProductFormTypeExternalColumn:
        productFormTypeExternalColumnModel(sequelize),
    ProductTypeExternalColumnsTableName:
        productTypeExternalColumnsTableNamesModel(sequelize),
    sequelize, // connection instance (RAW queries)
    Sequelize, // library
};
