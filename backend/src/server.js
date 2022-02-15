const express = require('express');
const sequelize = require('./util/database');

const app = express();

const City = require('./models/city');
const Property = require('./models/property');
const PropertyType = require('./models/propertyType');

const citiesRoutes = require('./routes/cities');

// Property.hasOne(City);
// City.belongsToMany(Property, { as: 'city'});
//
Property.belongsTo(City);
City.hasMany(Property);

Property.belongsTo(PropertyType);
PropertyType.hasMany(Property);

// Property.hasOne(PropertyType);
// PropertyType.belongsToMany(City);

app.use('/properties', (req, res) => {
    res.send('properties');
});

app.use('/cities', citiesRoutes);

app.use('/', (req, res) => {
    res.send('home koala');
});

sequelize.sync({alter: true, force: true})
    .then(
        app.listen(80)
    );
