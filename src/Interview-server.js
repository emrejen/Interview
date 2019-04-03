import express from 'express';
import routes from './server/routes';

const DEFAULT_APP_PORT = 3000;

class InterviewServer {
  constructor() {
    this.app = express();
    this.app.use(routes);
    this.port = process.env.PORT || DEFAULT_APP_PORT;
    this.instance = null;
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
