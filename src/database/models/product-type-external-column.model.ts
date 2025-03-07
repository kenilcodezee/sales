import { ProductTypeExternalColumn } from '@/interfaces/product-type-external-column.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductTypeModel } from './product-type.model';

export type ProductTypeExternalColumnCreationAttributes = Optional<
    ProductTypeExternalColumn,
    'id'
>;

export class ProductTypeExternalColumnModel
    extends Model<
        ProductTypeExternalColumn,
        ProductTypeExternalColumnCreationAttributes
    >
    implements ProductTypeExternalColumn
{
    public id!: string;
    public product_type_id!: string;
    public field_name!: string;
    public display_name!: string;
    public data_type!: string;
    public input_type!: string;
    public is_required!: boolean;
    public display_order!: number;

    static associate() {
        ProductTypeExternalColumnModel.belongsTo(ProductTypeModel, {
            as: 'productType',
            foreignKey: 'product_type_id',
        });
    }
}

export default function (
    sequelize: Sequelize,
): typeof ProductTypeExternalColumnModel {
    ProductTypeExternalColumnModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            product_type_id: {
                allowNull: false,
                type: DataTypes.UUID,
            },
            field_name: {
                allowNull: false,
                type: DataTypes.STRING(45),
            },
            display_name: {
                allowNull: false,
                type: DataTypes.STRING(45),
            },
            data_type: {
                allowNull: false,
                type: DataTypes.STRING(45),
            },
            input_type: {
                allowNull: false,
                type: DataTypes.STRING(45),
            },
            is_required: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
            },
            display_order: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            tableName: 'product_type_external_columns',
            paranoid: true,
        },
    );

    return ProductTypeExternalColumnModel;
}
