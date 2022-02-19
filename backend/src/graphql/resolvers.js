const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Property = require("../models/property");
const City = require("../models/city");
const PropertyType = require("../models/propertyType");
const UserWishlist = require("../models/userWishlist");
const {SECRET, ITEMS_PER_PAGE} = require("../constants");
const { Op } = require("sequelize");

module.exports = {
  createUser: async ({ userInput })  => {
    const {email, name, password} = userInput;
    const errors = [];

    if (!validator.isEmail(email)) {
      errors.push({ message: 'Invalid email.' });
    }

    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
      errors.push({ message: 'Password is too short!' });
    }

    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const existingUser = await User.findOne({where: { email }});

    if (existingUser) {
      throw new Error('User exists already!');
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({email, name, password: hashedPw});

    return await user.save();
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({where: { email }});
    if (!user) {
      const error = new Error('User not found.');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      const error = new Error('Password is incorrect.');
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
        {
          userId: user.id.toString(),
          email: user.email
        },
        SECRET,
        { expiresIn: '1h' }
    );
    return { token: token, userId: user.id.toString() };
  },
  getProperties: async (args, req) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    const decodedToken = jwt.verify(authToken, SECRET);
    const userId = decodedToken.userId;

    const { page } = args;
    console.log({page});

    const count = await Property.count();
    const pages = Math.ceil(count / ITEMS_PER_PAGE);
    console.log({pages, count});

    const items = await Property.findAll( {
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
      include: [{
        model: City,
        as: 'city'
      }, {
        model: PropertyType,
        as: 'propertyType'
      }],
    });

    const userWishlistProperties = await UserWishlist.findAll({
      where: {userId},
      raw: true
    });
    const userWishlistPropertiesIds = userWishlistProperties.map(p => p.propertyId);

    for(p of items){
      p.isInWishlist = userWishlistPropertiesIds.includes(p.id);
    }

    return {count, pages, items};
  },

  getWishlist: async (args, req) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    const decodedToken = jwt.verify(authToken, SECRET);
    const userId = decodedToken.userId;

    // const data =  await UserWishlist.findAll( {where: {userId}, include: Property});
    const data =  await UserWishlist.findAll( {where: {userId}});
    const propertyIds = data.map(({propertyId}) => propertyId);

    const wishlistProperties = Property.findAll({where: {id: {[Op.or]: propertyIds}}, include: [{
      model: City,
      as: 'city'
    }, {
      model: PropertyType,
      as: 'propertyType'
    }]});

    console.log(wishlistProperties);

    return wishlistProperties;
  },
  addToWishlist: async ({propertyId}, req) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    console.log({authToken});
    const decodedToken = jwt.verify(authToken, SECRET);
    console.log({decodedToken});
    const userId = decodedToken.userId;

    await UserWishlist.create({ userId, propertyId });
    return {success: true};
  },
  removeFromWishlist: async ({propertyId}, req) => {
    const authToken = req.headers['authorization'].split(' ')[1]
    const decodedToken = jwt.verify(authToken, SECRET);
    const userId = decodedToken.userId;

    await UserWishlist.destroy({where: { userId, propertyId }});
    return {success: true};
  }
};