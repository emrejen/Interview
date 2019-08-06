

import express from 'express';
import defaultRoute from './default-route';
import viewAllUsers from './users/view-all-users';
import viewAllMessages from './messages/view-all-messages';
import postNewMessage from './messages/post-new-message';
import clearMessages from './messages/clear-messages';
import Urls from './urls-definitions';

const router = express.Router();

router.get(Urls.DEFAULT, defaultRoute);
router.get(Urls.USERS, viewAllUsers);
router.get(Urls.MESSAGES, viewAllMessages);
router.post(Urls.POST_MESSAGE, postNewMessage);
router.post(Urls.CLEAR, clearMessages);


module.exports = router;
