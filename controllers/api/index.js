const router = require('express').Router();

const userRoutes = require('./user-routes');
const wineRoutes = require('./wine-routes');
const replyRoutes = require('./reply-routes');

router.use('/users', userRoutes);
router.use('/wines', wineRoutes);
router.use('/replies', replyRoutes);

module.exports = router;




