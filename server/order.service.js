const boom = require('@hapi/boom');

const { models } = require('../connection/sequelize');

//Agregar estados a las ordenes -> Pedido, entregado, pagado, noPagado, cancelado.

class OrderService {

  constructor() {
  }

  async create(data) {
    const { customerId } = data;

    const newOrder = await models.Order.create({
      customerId
    });

    return newOrder;
  }

  async addItem(data) {
    const { productId, orderId, amount } = data;

    const newItem = await models.OrderProduct.create({
      productId,
      orderId,
      amount
    });

    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll({
      attributes: { exclude: ['total'] }
    });

    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          attributes: { exclude: ['id', 'createdAt'] },
          include: [{
            association: 'user',
            attributes: { exclude: ['id', 'createdAt', 'role'] }
          }]
        },
        {
          association: 'items',
          attributes: { exclude: ['createdAt', 'isBlocked', 'image'] },
        }
      ]
    });

    if (!order) throw boom.notFound('Order not found');
    return order;
  }

  async update(id, changes) {
    const { customerId } = changes;

    const order = await models.Order.findByPk(id);

    if (!order) throw boom.notFound('Order not found');

    await order.update({
      customerId
    });

    return order;
  }

  async delete(id) {
    const order = await models.Order.findByPk(id);

    if (!order) throw boom.notFound('Order not found');

    await order.destroy()

    return "Order deleted successfully: " + id;
  }

}

module.exports = OrderService;
