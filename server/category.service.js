const boom = require('@hapi/boom');

const { models } = require('../connection/sequelize');

class CategoryService {

  constructor() {
  }
  async create(data) {

    const { name, image } = data;

    const newCategory = await models.Category.create({
      name,
      image
    });

    //this.products.push(newProduct);
    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll({
      attributes: {
        exclude: 'createdAt'
      }
    });
    return categories;
  }

  async findOne(id) {

    const category = await models.Category.findByPk(id, {
      include: [{
        model: models.Product,
        as: 'products',
        attributes: {
          exclude: ['createdAt', 'categoryId']
        }
      }]
    });

    if (!category) throw boom.notFound('Category not found');

    return category;
  }

  async update(id, changes) {

    const { name, image } = changes;

    const category = await models.Category.findByPk(id);

    if (!category) throw boom.notFound('Category not found');

    await category.update({
      name,
      image
    });

    return category;
  }

  async delete(id) {

    const category = await models.Category.findByPk(id);

    if (!category) throw boom.notFound('Category not found');

    await category.destroy();

    return "Category deleted succesfully: " + id;
  }

}

module.exports = CategoryService;
