import HttpStatus from 'http-status-codes';
import dao from '../database/application-db-adapter';

const viewAllUsers = (req, res) => {
  res.status(HttpStatus.OK).json({
    users: dao.getUsers(),
  });
};

export default viewAllUsers;
