// import all models
const User = require('./User');
const Wine = require('./Wine');
const Reply = require('./Reply');
const Vote = require('./Vote');

User.hasMany(Wine, {
    foreignKey: 'user_id'
});

Wine.belongsTo(User, {
    foreignKey: 'user_id',
});

User.belongsToMany(Wine, {
    through: Vote,
    as: 'voted_wine',
    foreignKey: 'user_id'
});

Wine.belongsToMany(User, {
    through: Vote,
    as: 'voted_wine',
    foreignKey: 'wine_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});
  
Vote.belongsTo(Wine, {
    foreignKey: 'wine_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});
  
Wine.hasMany(Vote, {
    foreignKey: 'wine_id'
});

Reply.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
Reply.belongsTo(Wine, {
    foreignKey: 'wine_id'
});

User.hasMany(Reply, {
    foreignKey: 'user_id'
});
  
Wine.hasMany(Reply, {
    foreignKey: 'wine_id'
});

module.exports = { User, Wine, Reply };
