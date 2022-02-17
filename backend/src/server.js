const express = require('express');
const sequelize = require('./util/database');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const City = require('./models/city');
const Property = require('./models/property');
const PropertyType = require('./models/user');
const User = require('./models/propertyType');
const ClientRequests = require('./models/clientRequests');

const { graphqlHTTP  } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const citiesRoutes = require('./routes/cities');
const clientRequestsRoutes = require('./routes/clientRequests');

Property.belongsTo(City);
City.hasMany(Property);

Property.belongsTo(PropertyType);
PropertyType.hasMany(Property);

const UserWishlist = sequelize.define('user_wishlist', { }, {timestamps: false});
User.belongsToMany(Property, { through: UserWishlist });
Property.belongsToMany(User, { through: UserWishlist });

app.use(cors());

app.use(bodyParser.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
);

app.use('/properties', (req, res) => {
    res.send('properties');
});

app.use('/cities', citiesRoutes);
app.use('/contact', clientRequestsRoutes);

app.use('/', (req, res) => {
    res.send('home koala');
});

sequelize.sync({alter: true})
    .then(
        app.listen(80)
    );
