
import HttpStatus from 'http-status-codes';
import dao from '../database/cellebrite-db';

const viewAllMessages = (req, res) => {
  res.status(HttpStatus.OK).json({
    messages: dao.getMessages(),
  });
};

export default viewAllMessages;
