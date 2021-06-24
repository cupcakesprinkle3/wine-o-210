const router = require('express').Router();
const { Wine, User } = require('../../models');

// get all wines
router.get('/', (req, res) => {
    Wine.findAll({
        attributes: ['id', 'wine_maker', 'wine_year', 'category', 'type', 'price', 'notes', 'created_at'],
        order: [['created_at', 'DESC']],
        // all_replies (this may be a reference from the Replies model ??)

        include: [
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
        attributes: ['id', 'wine_maker', 'wine_year', 'category', 'type', 'price', 'notes', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
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


router.post('/', (req, res) => {
    // expects ['wine_maker', 'wine_year', 'category', 'type', 'price', 'notes']
    Wine.create({
        wine_maker: req.body.wine_maker,
        wine_year: req.body.wine_year,
        category: req.body.category,
        type: req.body.type,
        price: req.body.price,
        notes: req.body.notes
        // do I need a created_at entry here?
    })
        .then(dbWineData => res.json(dbWineData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UPDATE ORIGINAL NOTES TO A WINE ENTRY
router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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
