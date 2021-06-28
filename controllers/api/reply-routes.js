const router = require('express').Router();
const withAuth = require('../../utils/auth');
const { Reply } = require('../../models');

router.get('/', (req, res) => {
  Reply.findAll({})
      .then(dbreplyData => res.json(dbreplyData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

//GET by {{id}}
router.get('/:id', (req, res) => {
  Reply.findAll({
          where: { 
              id: req.params.id}
      })
      .then(dbreplyData => res.json(dbreplyData))
      .catch(err => {
          console.log(err); 
          res.status(500).json(err); 
      })
});

router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Reply.create({
            reply_text: req.body.reply_text,
            wine_id: req.body.wine_id,
            // use the id from the session
            user_id: req.session.user_id
        })
            .then(dbReplyData => res.json(dbReplyData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// PUT to update a reply
router.put('/:id', withAuth, (req, res) => {
  Reply.update({

      reply_text: req.body.reply_text
    },

    {
      where: {
        id: req.params.id
      }

  }).then(dbReplyData => {
      if (!dbReplyData) {
          res.status(404).json({ message: 'No reply with this id was found' });
          return;
      }
      res.json(dbReplyData);
  }).catch(err => {
      console.log(err);
      res.status(500).json(err);
  });
});

router.delete('/:id', withAuth, (req, res) => {
    Reply.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbReplyData => {
        if (!dbReplyData) {
          res.status(404).json({ message: 'No reply found with this id!' });
          return;
        }
        res.json(dbReplyData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;