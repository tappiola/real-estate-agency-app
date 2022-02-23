const sequelize = require('../util/database');
const User = require("./user");
const Property = require("./property");
const Tag = require("./tag");

const PropertyTag = sequelize.define('property_tag', { }, {timestamps: false});

Property.belongsToMany(User, { through: PropertyTag });
Tag.belongsToMany(Property, { through: PropertyTag });

module.exports = PropertyTag;
