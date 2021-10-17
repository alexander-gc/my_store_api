const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
            model: CUSTOMER_TABLE,
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
    },
    total: {
        type: DataTypes.VIRTUAL, //El tipo virtual no se refleja en la base de datos, nada más se refleja en Node.
        get() {
            if (this.items.length > 0) {
                return this.items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.amount);
                }, 0);
            }
            return 0;
        }
    }
};

class Order extends Model {
    static associate(models) {
        this.belongsTo(models.Customer, { as: 'customer' });

        /* Aquí es una relación N a N, en estos casos se usa una tabla intermediaria.
        Order le van a pertenecer muchos productos.
        El through es la tabla intermediaria.
        */

        this.belongsToMany(models.Product, {
            as: 'items', //productos
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false
        }
    }
};

module.exports = { OrderSchema, Order, ORDER_TABLE };