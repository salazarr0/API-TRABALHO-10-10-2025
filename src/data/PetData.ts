
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

    async criarPetNoBancoDeDados(name: string, user_id: Number){
            try{
                const pet: Pet = await connection('pets')
                    .insert([
                        {name: name, user_id: user_id}
                    ]);
                const newPet = { 
                    id: pet.id,
                    name,
                    user_id
                }
                return newPet;
            }catch(error: any){
                throw new Error(error.sqlMessage|| error.message);
            }
        }

        
         async atualizarPetNoBancoDeDados(idPet: Number,updateName: String, updateUserId: Number){
                try{
                    await connection('pets')
                    .where({id: idPet})
                    .update({
                        name: updateName,
                        user_id: updateUserId,
                    });
        
                    const petUpdate: Pet = await connection('pets')
                    .select("*")
                    .where({id:idPet})
                    .first();
    
                    return petUpdate;
                }catch(error: any){
                    throw new Error(error.sqlMessage|| error.message);
                }
            }
 }
 