
 import { connection } from "../dbConnection";
 import { Pet } from "../types/Pet";
 export class PetData {
 
    async pegarTodosPetsBD() {
        try {
            const pets = await connection('pets').select();
            return pets;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async pegarPetPeloIdNoBD(petId: Number) {
        try {
            const petExpecifico : Pet = await connection('pets').where({ id: petId }).first();
            return petExpecifico;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
 }
 