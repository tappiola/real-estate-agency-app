const express = require('express');
const sequelize = require('./util/database');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const authentication = require('./middlewares/authentication')

const City = require('./models/city');
const Property = require('./models/property');
const PropertyType = require('./models/propertyType');
const User = require('./models/user');
const ClientRequests = require('./models/clientRequests');
const UserWishlist = require('./models/userWishlist');
const Image = require('./models/images');

const { graphqlHTTP  } = require('express-graphql');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

Property.belongsTo(City);
City.hasMany(Property);

Property.belongsTo(PropertyType);
PropertyType.hasMany(Property);

Image.belongsTo(Property);
Property.hasMany(Image);

app.use(cors());

app.use(bodyParser.json());

app.use(authentication);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true
    })
);

app.use('/', (req, res) => {
    res.send('404');
});

sequelize.sync({alter: true})
    .then(
        app.listen(80)
    );
