const boom = require('@hapi/boom');

const { models } = require('../connection/sequelize');

//const pool = require('../connection/pool');
//const connection = require('../connection/connection');

class UserService {
  constructor() {
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const { email, password } = data;

    const emailExists = await models.User.findOne({
      where: {
        email
      }
    });

    if (emailExists) throw boom.conflict("Email already exists in the database");

    const newUser = await models.User.create({
      email,
      password
    });

    return newUser;
  }

  async find() {
    //const query = 'SELECT * FROM users';
    //const [data] = await sequelize.query(query);

    const user = await models.User.findAll({
      include: ['customer']
    });
    return user;

    //const resp = await this.pool.query(query);
    //return resp.rows;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });

    if (!user) throw boom.notFound("User not found in the database");

    return user;
  }

  async update(id, changes) {
    const { email } = changes;

    const user = await models.User.findByPk(id);

    if (!user) throw boom.notFound("User not found in the database");

    user.update({
      email
    });

    return user;
  }

  async delete(id) {
    const user = await models.User.findByPk(id);

    if (!user) throw boom.notFound("User not found in the database");

    await user.destroy();

    return "User deleted successfully: " + id;
  }
}

module.exports = UserService;
