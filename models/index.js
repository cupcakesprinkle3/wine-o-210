// import all models
const User = require('./User');
const Wine = require('./Wine');

User.hasMany(Wine, {
    foreignKey: 'id'
});

Wine.belongsTo(User, {
    foreignKey: 'id'
});

module.exports = { User, Wine };
