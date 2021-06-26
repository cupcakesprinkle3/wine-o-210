const seedUsers = require('./user-seeds');
const seedWine = require('./wine-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedWine();
  console.log('\n----- WINE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SYNCED -----\n');

  process.exit(0);
};

seedAll();
