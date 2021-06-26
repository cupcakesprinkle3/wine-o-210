const router = require('express').Router();
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');
const { Wine, User, Reply, Vote } = require('../../models');

// get all wines
router.get('/', (req, res) => {
    Wine.findAll({
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
        .then(dbWineData => res.json(dbWineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
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
        .then(dbWineData => {
            if (!dbWineData) {
                res.status(404).json({ message: 'No wine found with this id' });
                return;
            }
            res.json(dbWineData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.post('/', withAuth, (req, res) => {
    // expects ['wine_maker', 'wine_year', 'category', 'type', 'price', 'notes']
    Wine.create({
        wine_maker: req.body.wine_maker,
        wine_year: req.body.wine_year,
        category: req.body.category,
        type: req.body.type,
        price: req.body.price,
        notes: req.body.notes,
        user_id: req.session.user_id
        // do I need a created_at entry here?
    })
        .then(dbWineData => res.json(dbWineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Wine voting route
router.put('/vote', withAuth, (req, res) => {
    if (req.session) {
      Wine.vote({ ...req.body, user_id: req.session.user_id }, { Vote, Comment, User })
        .then(updatedVoteData => res.json(updatedVoteData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  });

// UPDATE ORIGINAL NOTES TO A WINE ENTRY
router.put('/:id', withAuth, (req, res) => {
    Wine.update(
        {
            notes: req.body.notes
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbWineData => {
            if (!dbWineData) {
                res.status(404).json({ message: 'No wine entry found with this id' });
                return;
            }
            res.json(dbWineData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// router.put('/upvote', (req, res) => {
//     // make sure the session exists first
//     if (req.session) {
//         // pass session id along with all destructured properties on req.body
//         Wine.upvote({ ...req.body, user_id: req.session.user_id }, { Vote, Reply, User })
//             .then(updatedVoteData => res.json(updatedVoteData))
//             .catch(err => {
//                 console.log(err);
//                 res.status(500).json(err);
//             });
//     }
// });

router.delete('/:id', withAuth, (req, res) => {
    Wine.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbWineData => {
            if (!dbWineData) {
                res.status(404).json({ message: 'No wine entry found with this id' });
                return;
            }
            res.json(dbWineData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
