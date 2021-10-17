const { Model, DataTypes, Sequelize } = require('sequelize');
const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCT_TABLE = 'orders_products';

const OrderProductSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    amount: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    orderId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'order_id',
        references: {
            model: ORDER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
            model: PRODUCT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    }
};

class OrderProduct extends Model {
    //Aquí no habrá asociación, se hará en la tabla Order (ya que tendrá muchos productos)
    static associate(models) { }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_PRODUCT_TABLE,
            modelName: 'OrderProduct',
            timestamps: false
        }
    }
};

module.exports = { OrderProductSchema, OrderProduct, ORDER_PRODUCT_TABLE };