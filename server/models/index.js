const config = require('../config');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options,
);

let models = {};

fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js')
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        models[model.name] = model;
    })

models.sequelize = sequelize;


module.exports = models;