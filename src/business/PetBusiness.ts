import { PetData } from "../data/PetData";
import { UserData } from "../data/UserData";
import { Pet } from "../types/Pet";
export class PetBusiness {
    
    petData = new PetData();
    userData = new UserData();

    public async verificarReferenciaDaFgKey(user_id:Number): Promise<boolean>{
        const users = await this.userData.pegarUsuarioPeloIdNoBD(user_id);
        if(users){
            return true;
        }else{
            return false
        }
    }

    public async pegarPetPeloId(petId: Number): Promise<Pet | null> {
        try{
            const pet = await this.petData.pegarPetPeloIdNoBD(petId);
            return pet;
        }catch(error: any){
            throw error;
        }
    }

    public async pegarTodosPets(): Promise<Pet[]> {
        try{
            const pets = await this.petData.pegarTodosPetsBD();
            return pets;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    public async postarNovoPet( name: string, user_id: Number): Promise<Pet>{
        try{          
            const temReferencia = await this.verificarReferenciaDaFgKey(user_id);      
            if(temReferencia){
                const postarPet = await this.petData.criarPetNoBancoDeDados(name , user_id);
                return postarPet;
            }else{    
                throw new Error("Falha: O'user_id' não referencia nehum usuário!");
            }
        }catch(error:any){
            throw new Error(error.message);
        }
    }


}