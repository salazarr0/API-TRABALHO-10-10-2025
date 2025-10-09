import { PetData } from "../data/PetData";
import { Pet } from "../types/Pet";
export class PetBusiness {
    
    petData = new PetData();

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

}