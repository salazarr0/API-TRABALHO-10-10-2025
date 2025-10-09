import express from 'express'
import { PetController } from '../controller/PetController';
export const petRouter = express.Router();

const petController = new PetController();

petRouter.get('/', petController.getAll);
petRouter.get('/:id', petController.getById);

//petRouter.post('/', petController.postUsers);

//petRouter.put('/:id',petController.putUsers);

//petRouter.delete('/:id',petController.deleteUsers);