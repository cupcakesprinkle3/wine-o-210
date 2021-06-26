const { Model, DataTypes, INTEGER } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Wine extends Model {

}

Wine.init(
    {
      wine_maker: {
          type: DataTypes.STRING,
          allowNull: false
      },
      wine_year: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      category: {
          type: DataTypes.STRING,
          allowNull: false
      },
      type: {
          type: DataTypes.STRING,
          allowNull: false
      },
      price: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      notes: {
          type: DataTypes.STRING,
          allowNull: false
      },
      created_at: {
          type: DataTypes.STRING,
          allowNull: false
      },

    },

    {
        sequelize
        
      });
      
module.exports = Wine;