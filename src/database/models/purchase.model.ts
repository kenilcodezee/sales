import { Purchase } from '@/interfaces/purchase.interfaces';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ProductTypeModel } from './product-type.model';

export type PurchaseCreationAttributes = Optional<Purchase, 'id'>;

export class PurchaseModel
    extends Model<Purchase, PurchaseCreationAttributes>
    implements Purchase
{
    public id!: string;
    public product_type_id!: string;
    public currency!: 'INR' | 'USD';
    public remark!: string;

    static associate() {
        PurchaseModel.belongsTo(ProductTypeModel, {
            as: 'productType',
            foreignKey: 'product_type_id',
        });
    }
}

export default function (sequelize: Sequelize): typeof PurchaseModel {
    PurchaseModel.init(
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
            currency: {
                allowNull: false,
                type: DataTypes.ENUM('INR', 'USD'),
            },
            remark: {
                allowNull: false,
                type: DataTypes.STRING,
            },
        },
        {
            sequelize,
            tableName: 'purchases',
            paranoid: true,
        },
    );

    return PurchaseModel;
}
