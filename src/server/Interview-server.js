import HttpStatus from 'http-status-codes';
import cors from 'cors';
import routes from './routes';
import MissingAuthenticationTokenException from './expections/missing-auth-token';

const DEFAULT_APP_PORT = 3000;

export const X_AUTH_HEADER = 'x-authentication-token';
export const VERY_SECRETE_TOKEN = 'very-secrete-token';

const InterviewServer = express => {
    const verifyAuthenticationHeader = (request, response, next) => {
        const token = request.headers[X_AUTH_HEADER];
        if (token === undefined || token !== VERY_SECRETE_TOKEN) {
            const error = new MissingAuthenticationTokenException();
            error.status = HttpStatus.FORBIDDEN;
            return next({error: '', status: HttpStatus.FORBIDDEN});
        }
        return next();
    };
    const app = express();
    let instance;
    app.use(cors());
    app.use(verifyAuthenticationHeader);
    app.use(routes);
    const port = process.env.PORT || DEFAULT_APP_PORT;
    return {
        start() {
            // eslint-disable-next-line no-console
            instance = app.listen(port, () => console.log(`Interview app listening on port ${port}!`));
        },
        shutdown() {
            instance.close();
        },
    };
};
export default InterviewServer;
