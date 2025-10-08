import { connection } from "../dbConnection";
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
}
