/* eslint-disable no-unused-vars */
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const { graphqlHTTP  } = require('express-graphql');
const sequelize = require('./util/database');

const authentication = require('./middlewares/authentication');

const City = require('./models/city');
const Property = require('./models/property');
const PropertyType = require('./models/propertyType');
const Image = require('./models/images');
const Type = require('./models/type');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

Property.belongsTo(City);
City.hasMany(Property);

Property.belongsTo(PropertyType);
PropertyType.hasMany(Property);

Image.belongsTo(Property);
Property.hasMany(Image);

Property.belongsTo(Type);
Type.hasMany(Property);

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(authentication);

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn: (error) => {
            console.log({error});

            return {
                message: error.message,
                locations: error.locations,
                stack: error.stack ? error.stack.split('\n') : [],
                path: error.path,
                extensions: error.extensions,
            };
        }
    })
);

app.use('/', (req, res) => {
    res.send('404');
});

sequelize.sync({alter: true})
    .then(
        app.listen(process.env.PORT || 5000)
    );
