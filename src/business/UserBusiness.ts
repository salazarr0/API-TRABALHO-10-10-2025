import { UserData } from "../data/UserData";
import { User } from "../types/User";
export class UserBusiness {
    
    userData = new UserData();
    public async getUserById(userId: Number): Promise<User | null> {
        try{
            const user = await this.userData.getUserById(userId);
            return user;
        }catch(error: any){
            throw error;
        }
    }

    public async getAllUsers(): Promise<User[]> {
        try{
            const users = await this.userData.getAllUsers();
            return users;
        }catch(error: any){
            throw new Error(error.message);
        }
    }

    private async veryEmail(email: string): Promise<boolean>{
        try{
            const users = await this.userData.getUserByEmail(email);
            if(users){
                return true;
            }
            return false;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    public async postNewUser( name: string, email: string): Promise<User>{
        try{
            const emaiIsTrue = await this.veryEmail(email);
            if(emaiIsTrue){
                throw new Error("Email já existente");
            }

            const newUser = await this.userData.postNewUser(name, email);

            return newUser;

        }catch(error:any){
            throw new Error(error.message);
        }
    }
}