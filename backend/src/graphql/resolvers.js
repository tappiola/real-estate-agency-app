const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Property = require("../models/property");
const City = require("../models/city");
const PropertyType = require("../models/propertyType");
const UserWishlist = require("../models/userWishlist");
const Image = require("../models/images");
const {SECRET, ITEMS_PER_PAGE} = require("../constants");
const { Op } = require("sequelize");
const ClientRequest = require("../models/clientRequests");
const Type = require("../models/type");
const Tag = require("../models/tag");

const createUser = async ({ userInput })  => {
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
};

const login = async ({ email, password }) => {
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
};

const getProperties = async (args, req) => {
  const { adType, page, cityId, propertyTypeId } = args;

  const cityCondition = cityId ? {cityId} : {};
  const propertyTypeCondition = propertyTypeId ? {propertyTypeId} : {};

  const {id: typeId} = await Type.findOne({where: {name: adType}});
  console.log({typeId, ...cityCondition, ...propertyTypeCondition});

  const items = await Property.findAll( {
    where: {typeId, ...cityCondition, ...propertyTypeCondition},
    offset: (page - 1) * ITEMS_PER_PAGE,
    limit: ITEMS_PER_PAGE,
    include: [{
      model: City,
      as: 'city'
    }, {
      model: PropertyType,
      as: 'propertyType'
    }, {
      model: Image,
      as: 'images'
  }, {
      model: Type,
      as: 'type'
    }, {
      model: Tag,
      as: 'tags'
    }
    ]
  });

  const count = items.length;

  const pages = Math.ceil(count / ITEMS_PER_PAGE);

  if(req.isAuthenticated){
    const userWishlistProperties = await UserWishlist.findAll({
      where: {userId: req.userId},
      raw: true
    });
    const userWishlistPropertiesIds = userWishlistProperties.map(p => p.propertyId);

    items.forEach(p => p.isInWishlist = userWishlistPropertiesIds.includes(p.id))
  }

  return {count, pages, items};
};

const getProperty = async ({id}, req) => {
  const property = await Property.findOne({where: {id}, include: [{
      model: City,
      as: 'city'
    }, {
      model: PropertyType,
      as: 'propertyType'
    }]
  });

  if(req.isAuthenticated){
    const propertyInWishlist = await UserWishlist.findOne({
      where: {userId: req.userId, propertyId: id}
    });

    property.isInWishlist = !!propertyInWishlist;
  }

  return property;
};

const getWishlist = async (args, req) => {
  if(!req.isAuthenticated){
    throw new Error('User is not authenticated');
  }

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

  return wishlistProperties;
};

const addToWishlist = async ({propertyId}, req) => {
  if(!req.isAuthenticated){
    throw new Error('User is not authenticated');
  }

  await UserWishlist.create({ userId: req.userId, propertyId });
  return {success: true};
};

const removeFromWishlist =  async ({propertyId}, req) => {
  if(!req.isAuthenticated){
    throw new Error('User is not authenticated');
  }

  try {
    await UserWishlist.destroy({where: {userId: req.userId, propertyId}});
    return {success: true};
  } catch {
    return {success: false};
  }
}

const saveClientRequest = async ({firstName, lastName, email, phone}) => {
  try {
    await ClientRequest.create({firstName, lastName, email, phone});
    return {success: true};
  } catch {
    return {success: false};
  }
};

const getCities = async () => {
  return await City.findAll();
}


const getPropertyTypes = async () => {
  return await PropertyType.findAll();
}

module.exports = {
  createUser,
  login,
  getProperties,
  getProperty,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  saveClientRequest,
  getCities,
  getPropertyTypes
};
