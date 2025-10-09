import { Request, Response } from "express";
import { PetBusiness } from "../business/PetBusiness";
export class PetController {

    petBusiness = new PetBusiness();

    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    error: 'ID do pet é obrigatório e deve ser um número'
                });
            }
            const idNumber = Number(id);
            const pet = await this.petBusiness.pegarPetPeloId(idNumber);
            if (!pet) {
                return res.status(404).json({ error: 'Pet não encontrado' });
            }
            res.status(200).send(pet);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };
    public getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.petBusiness.pegarTodosPets();
            res.status(200).send(users);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };
}