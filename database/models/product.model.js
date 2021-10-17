const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    image: {
        allowNull: false,
        type: DataTypes.STRING
    },
    isBlocked: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    description: {
        allowNull: false,
        type: DataTypes.TEXT
    },
    categoryId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'category_id',
        references: {
            model: CATEGORY_TABLE,
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

class Product extends Model {
    static associate(models) {
        this.belongsTo(models.Category, {
            as: 'category'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false
        }
    }
};

module.exports = { Product, ProductSchema, PRODUCT_TABLE };
