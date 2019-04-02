

import express from 'express';
import defaultRoute from './default-route';
import viewAllUsers from './users/view-all-users';
import viewAllMessages from './messages/view-all-messages';
import postNewMessage from './messages/post-new-message';

const router = express.Router();

router.get('/', defaultRoute);
router.get('/users', viewAllUsers);
router.get('/messages', viewAllMessages);
router.post('/messages/:userId/:message', postNewMessage);


module.exports = router;
