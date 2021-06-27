const router = require('express').Router();
const sequelize = require('../config/connection');
const { Wine, User, Reply, Vote } = require('../models');


// get all wine wines for homepage
router.get('/', (req, res) => {
  console.log('======================');
  Wine.findAll({
    attributes: [
      'id', 
      'wine_maker', 
      'wine_year', 
      'category', 
      'type', 
      'price', 
      'notes', 
      'created_at',
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
      const wines = dbWineData.map(wine => wine.get({ plain: true }));

      res.render('homepage', {
        wines,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// get single post
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
      'created_at'
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
      if (!dbWineData) {
        res.status(404).json({ message: 'No wine wine found with this id' });
        return;
      }

      const wine = dbWineData.get({ plain: true });

      res.render('single-post', {
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

