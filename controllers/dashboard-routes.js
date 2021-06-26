const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Wine, User, Reply } = require('../models');


router.get('/', withAuth, (req, res) => {
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
        'created_at',
       // [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
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
        const entries = dbWineData.map(entry => entry.get({ plain: true }));
        res.render('dashboard', { entries, loggedIn: true });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
module.exports = router;