
import HttpStatus from 'http-status-codes';
import dao from '../database/application-db-adapter';

const viewAllMessages = (_, res) => {
  res.status(HttpStatus.OK).json({
    messages: dao.getMessages(),
  });
};

export default viewAllMessages;
