import HttpStatus from 'http-status-codes';
import dao from '../database/application-db-adapter';

const postNewMessage = (req, res) => {
  const { userId, message } = req.params;
  dao.postMessage({ message, user: { id: userId } });
  res.status(HttpStatus.CREATED).send();
};

export default postNewMessage;
