const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { truncate } = require('./User');

// create our Post model
class Wine extends Model {
    static vote(body, models) {
        return models.Vote.create({
          user_id: body.user_id,
          wine_id: body.wine_id
        }).then(() => {
          return Wine.findOne({
            where: {
              id: body.wine_id
            },
            attributes: [
                'id',
                'wine_maker', 
                'wine_year', 
                'category', 
                'type', 
                'price', 
                'notes', 
                [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE wine.id = vote.wine_id)'), 'vote_count']
            ]
          });
        });
      }
    }

Wine.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
          },

        wine_maker: {
            type: DataTypes.STRING,
            allowNull: false
        },

        wine_year: {
            type: DataTypes.INTEGER,
            len: [4],
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
            allowNull: true
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id'
            }
          },
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'wine'
        
    }
);

module.exports = Wine;