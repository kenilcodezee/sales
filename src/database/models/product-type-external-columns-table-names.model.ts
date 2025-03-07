import { ProductTypeExternalColumnsTableName } from '@/interfaces/product-type-external-columns-table-names.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductTypeModel } from './product-type.model';

export type ProductTypeExternalColumnsTableNameCreationAttributes = Optional<
    ProductTypeExternalColumnsTableName,
    'id'
>;

export class ProductTypeExternalColumnsTableNameModel
    extends Model<
        ProductTypeExternalColumnsTableName,
        ProductTypeExternalColumnsTableNameCreationAttributes
    >
    implements ProductTypeExternalColumnsTableName
{
    public id!: string;
    public product_type_id!: string;
    public purchase!: string;

    static associate() {
        ProductTypeExternalColumnsTableNameModel.belongsTo(ProductTypeModel, {
            as: 'productType',
            foreignKey: 'product_type_id',
        });
    }
}

export default function (
    sequelize: Sequelize,
): typeof ProductTypeExternalColumnsTableNameModel {
    ProductTypeExternalColumnsTableNameModel.init(
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
            purchase: {
                allowNull: false,
                type: DataTypes.STRING(45),
            },
        },
        {
            sequelize,
            tableName: 'product_type_external_columns_table_names',
            paranoid: true,
        },
    );

    return ProductTypeExternalColumnsTableNameModel;
}
