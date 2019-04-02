import HttpStatus from 'http-status-codes';
import dao from '../database/cellebrite-db';


const viewAllUsers = (req, res) => {
  res.status(HttpStatus.OK).json({
    users: dao.getUsers(),
  });
};

export default viewAllUsers;
