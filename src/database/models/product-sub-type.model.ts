import { ProductSubType } from '@/interfaces/product-sub-type.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type ProductSubTypeCreationAttributes = Optional<ProductSubType, 'id'>;

export class ProductSubTypeModel
    extends Model<ProductSubType, ProductSubTypeCreationAttributes>
    implements ProductSubType
{
    public id!: string;
    public product_type_id!: string;
    public name!: string;
    public code!: string;
}

export default function (sequelize: Sequelize): typeof ProductSubTypeModel {
    ProductSubTypeModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
            },
            product_type_id: {
                allowNull: false,
                type: DataTypes.UUIDV4,
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING,
            },
            code: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            tableName: 'product_sub_types',
            paranoid: true,
        },
    );

    return ProductSubTypeModel;
}
