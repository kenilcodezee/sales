import express from 'express';
import { getUserProfileController } from './product.controller';

const userRouter = express.Router();

userRouter.get('/profile', getUserProfileController);

export default userRouter;
