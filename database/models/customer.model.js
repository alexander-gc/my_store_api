const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    firstName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'first_name'
    },
    lastName: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'last_name'
    },
    phone: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATEONLY,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
};

//El Model contiene todos los métodos para hacer queries (find, findAll, etc);
class Customer extends Model {
    //En este schema customer, estará reflejado el campo userId (fk). userId pertenece a customer.
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' }); //Relación 1 a 1.
        this.hasMany(models.Order, {
            as: 'orders',
            foreignKey: 'customerId'
        }); //Relación 1 a N
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CUSTOMER_TABLE,
            modelName: 'Customer',
            timestamps: false
        }
    }
};

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };

