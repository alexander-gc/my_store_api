const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('../connection/sequelize');
class UserService {
  constructor() {
    //this.pool = pool;
    //this.pool.on('error', (err) => console.error(err));
  }

  async create(data) {
    const { email, password, role } = data;

    const passHash = await bcrypt.hashSync(password, 10);

    const emailExists = await models.User.findOne({
      where: {
        email
      }
    });

    if (emailExists) throw boom.conflict("Email already exists in the database");

    const newUser = await models.User.create({
      email,
      password: passHash,
      role
    });

    delete newUser.dataValues.password;

    return newUser;
  }

  async find() {
    //const query = 'SELECT * FROM users';
    //const [data] = await sequelize.query(query);

    const user = await models.User.findAll({
      attributes: { exclude: ['password'] },
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

  async findByEmail(email) {

    const user = await models.User.findOne({
      where: { email },
      attributes: { exclude: ['createdAt'] }
    });

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
