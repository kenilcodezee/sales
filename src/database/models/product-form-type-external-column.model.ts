import { ProductFormTypeExternalColumn } from '@/interfaces/product-form-type-external-column.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductTypeExternalColumnModel } from './product-type-external-column.model';

export type ProductFormTypeExternalColumnCreationAttributes = Optional<
    ProductFormTypeExternalColumn,
    'id'
>;

export class ProductFormTypeExternalColumnModel
    extends Model<
        ProductFormTypeExternalColumn,
        ProductFormTypeExternalColumnCreationAttributes
    >
    implements ProductFormTypeExternalColumn
{
    public id!: string;
    public form_type!: 'PURCHASE';
    public product_type_external_column_id!: string;

    static associate() {
        ProductFormTypeExternalColumnModel.belongsTo(
            ProductTypeExternalColumnModel,
            {
                as: 'productType',
                foreignKey: 'product_type_external_column_id',
            },
        );
    }
}

export default function (
    sequelize: Sequelize,
): typeof ProductFormTypeExternalColumnModel {
    ProductFormTypeExternalColumnModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            form_type: {
                allowNull: false,
                type: DataTypes.ENUM('PURCHASE'),
            },
            product_type_external_column_id: {
                allowNull: false,
                type: DataTypes.UUID,
            },
        },
        {
            sequelize,
            tableName: 'product_form_type_external_columns',
            paranoid: true,
        },
    );

    return ProductFormTypeExternalColumnModel;
}
