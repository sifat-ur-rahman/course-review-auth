import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { CategoryRoute } from './app/modules/category/category.route';
import { ReviewRoute } from './app/modules/review/review.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { CourseRoute } from './app/modules/course/course.route';
import { UserRoute } from './app/modules/user/user.route';
import { AuthRoutes } from './app/modules/auth/auth.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

//application route.

app.use('/', CourseRoute);
app.use('/', CategoryRoute);
app.use('/', ReviewRoute);
app.use('/', UserRoute);
app.use('/', AuthRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});
//route error handler
app.all('*', (req: Request, res: Response) => {
  res.status(400).json({
    success: false,
    message: 'Route is not found',
  });
});

app.use(globalErrorHandler);
export default app;
