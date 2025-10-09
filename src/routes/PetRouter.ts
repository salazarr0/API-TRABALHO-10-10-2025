import express from 'express'
import { PetController } from '../controller/PetController';
export const petRouter = express.Router();

const petController = new PetController();

petRouter.get('/', petController.getAll);
petRouter.get('/:id', petController.getById);

petRouter.post('/', petController.postPet);

//petRouter.put('/:id',petController.putPet);

//petRouter.delete('/:id',petController.deletePet);