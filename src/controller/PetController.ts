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

    public postPet = async (req: Request, res: Response) => {
        try {
            const postName = req.body.name;
            const postIdUser = parseInt(req.body.user_id);

            if (!postName|| postName.trim() === '') {
                res.status(400).send("O 'name' não pode ser string vazia!");
            }else if(!postIdUser){
                res.status(400).send("O 'user_id' deve ser inserido!");
            }
            const novoPet = await this.petBusiness.postarNovoPet(postName,postIdUser);
            res.status(201).send(novoPet);
            
        } catch (error: any) {
            if (error.message.includes("User_id inválido!")) {
                res.status(400).send({ message: error.message }); 
            }else {
                res.status(500).send({ message: "Ocorreu um erro inesperado." });
            }
        }
    }

    public putPet = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updateName = req.body.name;
            const updateUserId = Number(req.body.user_id);

            if (isNaN(id)) {
                res.status(400).send("Campo 'id' obrigatoriamente tem que ser um número!");
                return;
            }
            else if(!id) {
                res.status(400).send(":id faltando!")
                return;
            }
            else if(isNaN(updateUserId)){
                res.status(400).send("Campo 'userId' obrigatoriamente tem que ser um número!");
                return;
            }
            else if(!updateUserId){
                res.status(400).send("user_id faltando!")
                return;
            }
            else if (!updateName || updateName.trim() === '') {
                res.status(400).send("Campo(s) inválido!\nVerifique se 'name' está inseridos.");
                return;
            }

            const pet = await this.petBusiness.atualizarPet(id, updateName, updateUserId);

            if (!pet) {
                return res.status(404).json({ error: 'Pet não encontrado' });
            }

            res.status(201).send(pet);

        } catch (error: any) {
            if (error.message.includes("Falha ao encontrar pet: Id vinculado a nenhum pet!")) {
                res.status(404).send({ message: error.message });
            } else if (error.message.includes("User_id inválido")) {
                res.status(400).send({ message: error.message }); 
            } else {
                res.status(500).send({ message: "Ocorreu um erro inesperado." });
            }
        }
    }
}