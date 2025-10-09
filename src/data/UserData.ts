import { connection } from "../dbConnection";
import { User } from "../types/User";
export class UserData {

    async pegarUsuarioComPetsVinculadosNoBD(idDoUsuario: Number){
        try{
            const usuarioComPetsVinculados: User = await connection('pets')
            .where({user_id: idDoUsuario})
            .first();
            return usuarioComPetsVinculados;
        }catch(error: any){
            throw new error(error.sqlMessage ||error.message);
        }
    }

    async pegarUsuarioPeloIdNoBD(userId: Number) {
        try {
            const user : User = await connection('users').where({ id: userId }).first();
            return user;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async pegarTodosUsuariosNoBD() {
        try {
            const users = await connection('users').select();
            return users;
        } catch (error: any) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async pegarUsuarioPeloEmailNoBD(userEmail: string){
        try{
            const userE : User = await connection('users').where({email: userEmail}).first();
            return userE;
        }catch(error: any){
            throw new Error(error.sqlMessage|| error.message);
        }
    }

    async criarUsuarioNoBancoDeDados(name: string, email: string){
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

    async atualizarUsuarioNoBancoDeDados(idUsuario: Number, updateName: string, updateEmail: string){
        try{
            await connection('users')
            .where({id: idUsuario})
            .update({
                name: updateName,
                email: updateEmail,
            });

            const userUpdate: User = await connection('users')
            .select("*")
            .where({id:idUsuario})
            .first();

            return userUpdate;
        }catch(error: any){
            throw new Error(error.sqlMessage|| error.message);
        }
    }

    async deletarUsuarioNoBancoDeDados(idUsuario: Number){
        await connection('users')
        .where({id:idUsuario})
        .del();
    }
}
