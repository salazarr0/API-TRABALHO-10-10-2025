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
}