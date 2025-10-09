import { connection } from "../dbConnection";
import { User } from "../types/User";
export class UserData {
    async getUserById(userId: Number) {
        try {
            const user = await connection('users').where({ id: userId }).first();
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }
    async getAllUsers() {
        try {
            const users = await connection('users').select();
            return users;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async getUserByEmail(userEmail: string){
        try{
            const users = await connection('users').where({email: userEmail}).first();
            return users;
        }catch(error: any){
            throw new Error(error.sqlMessage|| error.message);
        }
    }

    async postNewUser(name: string, email: string){
        try{
            const user: User = await connection('users')
                .insert([
                    {name: name, email: email}
                ]);
            const newUser = { 
                id: user.id,
                name,
                email
            }
            return newUser;
        }catch(error: any){
            throw new Error(error.sqlMessage|| error.message);
        }
    }

    async insertTotalUpdate(id: number, updateName: string, updateEmail: string){
        try{
            await connection('users')
            .where({id: id})
            .update({
                name: updateName,
                email: updateEmail,
            });

            const userUpdate = await connection('users')
            .select("*")
            .where({id:id})
            .first();

            return userUpdate;
        }catch(error: any){
            throw new Error(error.sqlMessage|| error.message);
        }
    }
}
