import express from 'express'
import { UserController } from '../controller/UserController';
export const userRouter = express.Router();

const userController = new UserController();

userRouter.get('/', userController.getAll);
userRouter.get('/:id', userController.getById);

userRouter.post('/', userController.postUsers);

userRouter.put('/:id', userController.putUsers);

userRouter.delete('/:id', userController.deleteUsers);