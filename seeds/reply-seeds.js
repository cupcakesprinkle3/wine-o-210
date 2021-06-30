const { Reply} = require('../models');

const replyData = [
  {
    reply_text: "Ara! Onara suru tsumori datta kedo, unchi ga dechatta.",
    user_id: 1,
    post_id: 1,
    wine_id: 1,
  },
  {
    reply_text: "Koko wa doko? Watashi wa dare? Nani mo wakanai.",
    user_id: 2,
    post_id: 2,
    wine_id: 2,
  },
  {
    reply_text: "Anata wa haru no ichi ban no sakura yoree utsukushi.",
    user_id: 3,
    post_id: 3,
    wine_id: 3,
  }
];

const seedReplys = () => Reply.bulkCreate(replyData);

module.exports = seedReplys;