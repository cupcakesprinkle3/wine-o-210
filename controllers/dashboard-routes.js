const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Wine, User, Reply } = require('../models');


router.get('/', withAuth, (req, res) => {
    console.log(req.session);

    Wine.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id
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
      ],
      include: [
        {
          model: Reply,
          attributes: ['id', 'reply_text', 'wine_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbWineData => {
        // serialize data before passing to template
        const wines = dbWineData.map(wine => wine.get({ plain: true }));
        res.render('dashboard', { wines, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Get wine by ID
router.get('/wine/:id', (req, res) => {
  Wine.findOne({
    where: {
      id: req.params.id
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
    ],
    include: [
      {
        model: Reply,
        attributes: ['id', 'reply_text', 'wine_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbwineData => {
      if (!dbwineData) {
        res.status(404).json({ message: 'No wine found with this id' });
        return;
      }

      const wine = dbwineData.get({ plain: true });

      res.render('single-wine', {
          wine,
          loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});  

  
module.exports = router;