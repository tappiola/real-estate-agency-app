const express = require('express');
const sequelize = require('./util/database');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const City = require('./models/city');
const Property = require('./models/property');
const PropertyType = require('./models/propertyType');
const User = require('./models/user');
const ClientRequests = require('./models/clientRequests');
const UserWishlist = require('./models/userWishlist');

const { graphqlHTTP  } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

const citiesRoutes = require('./routes/cities');
const clientRequestsRoutes = require('./routes/clientRequests');

Property.belongsTo(City);
City.hasMany(Property);

Property.belongsTo(PropertyType);
PropertyType.hasMany(Property);

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