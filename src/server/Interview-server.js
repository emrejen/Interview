import express from 'express';
import HttpStatus from 'http-status-codes';
import cors from 'cors';
import routes from './routes';
import MissingAuthenticationTokenException from './expections/missing-auth-token';

const DEFAULT_APP_PORT = 3000;

export const X_AUTH_HEADER = 'x-authentication-token';
export const VERY_SECRETE_TOKEN = 'very-secrete-token';

class InterviewServer {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(this.vefityAuthenticationHeader);
    this.app.use(routes);
    this.port = process.env.PORT || DEFAULT_APP_PORT;
    this.instance = null;
  }

  vefityAuthenticationHeader(request, response, next) {
    const token = request.headers[X_AUTH_HEADER];
    if (token === undefined || token !== VERY_SECRETE_TOKEN) {
      const error = new MissingAuthenticationTokenException();
      error.status = HttpStatus.FORBIDDEN;
      return next({ error: '', status: HttpStatus.FORBIDDEN});
    }
    return next();
  }

  start() {
    // eslint-disable-next-line no-console
    this.instance = this.app.listen(this.port, () =>
      console.log(`Intervew app listening on port ${this.port}!`),
    );
  }

  shutdown() {
    this.instance.close();
  }
}
export default InterviewServer;
