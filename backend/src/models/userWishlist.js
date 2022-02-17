const sequelize = require('../util/database');
const User = require("./user");
const Property = require("./property");

const UserWishlist = sequelize.define('user_wishlist', { }, {timestamps: false});

User.belongsToMany(Property, { through: UserWishlist });
Property.belongsToMany(User, { through: UserWishlist });

module.exports = UserWishlist;
