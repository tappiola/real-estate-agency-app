const sequelize = require('../util/database');
const Property = require('./property');
const Tag = require('./tag');

const PropertyTag = sequelize.define('property_tag', { }, {timestamps: false});

Property.belongsToMany(Tag, { through: PropertyTag });
Tag.belongsToMany(Property, { through: PropertyTag });

module.exports = PropertyTag;
