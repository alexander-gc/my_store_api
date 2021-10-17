//const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../connection/sequelize');

class ProductsService {

  constructor() {
    //this.products = [];
    //this.generate();
  }

  /*  generate() {
      const limit = 15;
      for (let index = 0; index < limit; index++) {
        this.products.push({
          id: faker.datatype.uuid(),
          name: faker.commerce.productName(),
          price: parseInt(faker.commerce.price(), 10),
          image: faker.image.imageUrl(),
          isBlocked: faker.datatype.boolean(),
        });
      }
    } */

  async create(data) {
    const { isBlocked, name, price, image, categoryId, description } = data;

    const newProduct = await models.Product.create({
      isBlocked,
      name,
      price,
      image,
      categoryId,
      description
    });

    return newProduct;
  }

  async find(query) {

    const { limit, offset, price, price_min, price_max } = query;

    const options = {
      attributes: { exclude: ['createdAt'] },
      include: [{
        association: 'category',
        attributes: { exclude: ['id', 'createdAt'] }
      }],
      where: {}
    };

    if (limit && offset) {
      options.limit = limit; //El limite de productos que retornará.
      options.offset = offset;  // Es como la página o la posición del array.
    };

    if (price) { //Buscar precio exacto.
      options.where = { price };
    } else if (price_min && price_max) { //Buscar por rango de precios.
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      };
    };

    const product = await models.Product.findAll(options);

    return product;
  }

  async findOne(id) {
    //const product = this.products.find(item => item.id === id);
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });

    if (!product) throw boom.notFound('Product not found');

    if (product.isBlocked) throw boom.conflict('Product is blocked');

    return product;
  }

  async update(id, changes) {

    const { isBlocked, name, price, image, description } = changes;

    /*   const index = this.products.findIndex(item => item.id === id);
      if (index === -1) throw boom.notFound('Product not found');
      const product = this.products[index];
      this.products[index] = {
        ...product,
        ...changes
      }; */

    const product = await models.Product.findByPk(id);

    if (!product) throw boom.notFound('Product not found');

    await product.update({
      isBlocked,
      name,
      price,
      image,
      description
    });

    return product;
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) throw boom.notFound('Product not found');

    await product.destroy();

    return "Product destroyed successfully: " + id;
  }
}

module.exports = ProductsService;
