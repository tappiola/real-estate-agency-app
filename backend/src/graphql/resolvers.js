const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const User = require('../models/user');
const Property = require('../models/property');
const City = require('../models/city');
const PropertyType = require('../models/propertyType');
const UserWishlist = require('../models/userWishlist');
const Image = require('../models/images');
const {JWT_SECRET, ITEMS_PER_PAGE} = require('../constants');
const ClientRequest = require('../models/clientRequests');
const Type = require('../models/type');

const { NotAuthenticatedError } = require('./errors');

const createUser = async ({ userInput })  => {
    const {email, name, password} = userInput;
    const errors = [];

    if (!validator.isEmail(email)) {
        errors.push('Invalid email');
    }

    if (validator.isEmpty(password) || !validator.isLength(password, { min: 6 })) {
        errors.push('Password is too short');
    }

    if (errors.length > 0) {
        return {
            success: false,
            errorMessage: `Validation errors: '${errors.join(', ')}'`
        };
    }

    const existingUser = await User.findOne({where: { email }});

    if (existingUser) {
        return {
            success: false,
            errorMessage: 'User already exists'
        };
    }

    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({email, name, password: hashedPw});

    await user.save();

    return {success: true};
};

const login = async ({ email, password }) => {
    const user = await User.findOne({where: { email }});

    if (!user) {
        return { success: false, errorMessage: 'Please, check the email you entered'};
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
        return { success: false, errorMessage: 'Please, check the password you entered'};
    }

    const token = jwt.sign(
        {
            userId: user.id.toString(),
            email: user.email
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { success: true, token };
};

const getProperties = async ({ searchParams }, req) => {
    const { adType, page, cityId, propertyTypeId, minPrice, maxPrice, minBeds, maxBeds } = searchParams;

    const cityCondition = cityId ? {cityId} : {};
    const propertyTypeCondition = propertyTypeId ? {propertyTypeId} : {};

    const priceCondition = generateIntervalCondition('price', minPrice, maxPrice);
    const bedsCondition = generateIntervalCondition('bedroomCount', minBeds, maxBeds);

    const {id: typeId} = await Type.findOne({where: {name: adType}});

    const condition = {
        typeId,
        ...cityCondition,
        ...propertyTypeCondition,
        ...priceCondition,
        ...bedsCondition
    };

    const items = await Property.findAll({
        where: condition,
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
        }]
    });

    const allItems = await Property.findAll({
        where: condition,
        include: [{
            model: City,
            as: 'city'
        }, {
            model: PropertyType,
            as: 'propertyType'
        }, {
            model: Type,
            as: 'type'
        }]
    });

    const count = allItems.length;
    const pages = Math.ceil(count / ITEMS_PER_PAGE);

    if(req.isAuthenticated){
        const userWishlistProperties = await UserWishlist.findAll({
            where: {userId: req.userId},
            raw: true
        });
        const userWishlistPropertiesIds = userWishlistProperties.map(p => p.propertyId);

        items.forEach(p => p.isInWishlist = userWishlistPropertiesIds.includes(p.id));
    }

    return {count, pages, items};
};

const generateIntervalCondition = (field, from, to) => {
    if(from && to){
        return {[field]: {[Op.between]: [from, to]}};
    }

    if(from && !to){
        return {[field]: {[Op.gte]: from}};
    }

    if(!from && to){
        return {[field]: {[Op.lte]: to}};
    }

    return {};
};

const getProperty = async ({id}, req) => {
    const property = await Property.findOne({
        where: {id},
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
        }]
    });

    if(!property){
        return {found: false, propertyData: null};
    }

    if(req.isAuthenticated){
        const propertyInWishlist = await UserWishlist.findOne({
            where: {userId: req.userId, propertyId: id}
        });

        property.isInWishlist = !!propertyInWishlist;
    }

    return {found: true, propertyData: property};
};

const getWishlist = async (args, req) => {
    if(!req.isAuthenticated){
        throw new NotAuthenticatedError();
    }

    const data =  await UserWishlist.findAll( {where: {userId: req.userId}});
    const propertyIds = data.map(({propertyId}) => propertyId);

    if(!propertyIds.length){
        return [];
    }

    return Property.findAll({
        where: {id: {[Op.or]: propertyIds}},
        include: [{
            model: City,
            as: 'city'
        }, {
            model: PropertyType,
            as: 'propertyType'
        },
        {
            model: Image,
            as: 'images',
            limit: 1
        }, {
            model: Type,
            as: 'type'
        }]
    });
};

const addToWishlist = async ({propertyId}, req) => {
    if(!req.isAuthenticated){
        throw new NotAuthenticatedError();
    }

    await UserWishlist.create({ userId: req.userId, propertyId });
    return {success: true};
};

const removeFromWishlist =  async ({propertyId}, req) => {
    if(!req.isAuthenticated){
        throw new NotAuthenticatedError();
    }

    try {
        await UserWishlist.destroy({where: {userId: req.userId, propertyId}});
        return {success: true};
    } catch {
        return {success: false};
    }
};

const saveClientRequest = async (clientRequest) => {
    try {
        const { firstName, lastName, email, phone, message } = clientRequest;

        await ClientRequest.create({
            firstName, lastName, email, phone, message
        });

        return {success: true};
    } catch(e) {
        return {success: false, errorMessage: e.message};
    }
};

const getCities = async () => {
    return await City.findAll();
};


const getPropertyTypes = async () => {
    return await PropertyType.findAll();
};

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
