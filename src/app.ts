import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRoutes } from './app/modules/users/users.route';

const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application Route
app.use('/api/v1/users', UserRoutes);

app.get('/', () => {
    Promise.reject(new Error('Unhandled promise rejection'));
});

app.use(globalErrorHandler);

export default app;
