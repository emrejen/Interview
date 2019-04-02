import HttpStatus from 'http-status-codes';
import dao from '../database/cellebrite-db';

const postNewMessage = (req, res) => {
  const { userId, message } = req.params;
  dao.postMessage({ message, user: { id: userId } });
  res.status(HttpStatus.CREATED).send();
};

export default postNewMessage;
