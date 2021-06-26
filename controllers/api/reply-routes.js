const router = require('express').Router();
const withAuth = require('../utils/auth');
const { Reply } = require('../../models');

router.get('/', (req, res) => {

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