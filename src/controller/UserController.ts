import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
export class UserController {
    userBusiness = new UserBusiness();
    public getById = async (req: Request, res: Response) => {
        try {
            const id = req.params.id;
            if (!id || isNaN(Number(id))) {
                return res.status(400).json({
                    error: 'ID do usuário é obrigatório e deve ser um número'
                });
            }
            const idNumber = Number(id);
            const user = await this.userBusiness.pegarUsuarioPeloId(idNumber);
            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            res.status(200).send(user);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };
    public getAll = async (req: Request, res: Response) => {
        try {
            const users = await this.userBusiness.pegarTodosUsuarios();
            res.status(200).send(users);
        } catch (error: any) {
            res.status(500).send({ error: error.message });
        }
    };

    public postUsers = async (req: Request, res: Response) => {
        try {
            const { name, email } = req.body;
            if (!name || !email) {
                res.status(400).send("Campos faltantes!\nVerifique se email e name estão inseridos.");
            }
            const users = await this.userBusiness.postarNovoUsuario(name, email);
            res.status(201).send(users);
        } catch (error: any) {
            if (error.message.includes("Email já existente")) {
                res.status(409).send({ message: error.message }); 
            }else {
                res.status(500).send({ message: "Ocorreu um erro inesperado." });
            }
        }
    };

    public putUsers = async (req: Request, res: Response) => {
        try {
            const id = Number(req.params.id);
            const updateName = req.body.name;
            const updateEmail = req.body.email;

            if (isNaN(id)) {
                res.status(400).send("Campo 'id' obrigatoriamente tem que ser um número!");
                return;
            }
            if (!id) {
                res.status(400).send(":id faltante!")
                return;
            }
            if (!updateName|| !updateEmail ) {
                res.status(400).send("Campos faltantes!\nVerifique se email e name estão inseridos.");
                return;
            }

            const user = await this.userBusiness.atualizarUsuario(id, updateName, updateEmail);

            if (!user) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            res.status(201).send(user);

        } catch (error: any) {
            if (error.message.includes("Falha ao encontrar usuário: Número vinculado a nenhum usuário!")) {
                res.status(404).send({ message: error.message });
            } else if (error.message.includes("Email já existente")) {
                res.status(409).send({ message: error.message }); 
            } else {
                res.status(500).send({ message: "Ocorreu um erro inesperado." });
            }
        }
    }

    public deleteUsers = async (req: Request, res: Response) =>{
        try{
            const id = Number(req.params.id);
            if(isNaN(id)){
                res.status(400).send("Campo 'id' obrigatoriamente tem que ser um número!");
                return;
            }else if (!id) {
                res.status(400).send(":id faltante!")
                return;
            }else{
                await this.userBusiness.deletarUsuario(id);
                res.status(204).send();
            }
        }catch(error: any){
            if (error.message.includes("Falha ao encontrar usuário: Número vinculado a nenhum usuário!")) {
                res.status(404).send({ message: error.message });
            } else if (error.message.includes("Falha ao excluir: Usuário tem pet(s) vinculados!")) {
                res.status(409).send({ message: error.message }); 
            } else {
                res.status(500).send({ message: "Ocorreu um erro inesperado." });
            }
        }
    }
}
