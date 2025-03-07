import { ProductType } from '@/interfaces/product-type.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

export type ProductTypeCreationAttributes = Optional<ProductType, 'id'>;

export class ProductTypeModel
    extends Model<ProductType, ProductTypeCreationAttributes>
    implements ProductType
{
    public id!: string;
    public name!: string;
    public code!: string;
}

export default function (sequelize: Sequelize): typeof ProductTypeModel {
    ProductTypeModel.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUIDV4,
                defaultValue: DataTypes.UUIDV4,
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
            tableName: 'product_types',
            paranoid: true,
        },
    );

    return ProductTypeModel;
}
