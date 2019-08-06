import HttpStatus from 'http-status-codes';
import dao from '../database/application-db-adapter';

const clearMessages = (request, response) => {
    dao.clearMessages();
    response.status(HttpStatus.OK).send({status: 'success'});
};

export default clearMessages;