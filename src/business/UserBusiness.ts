import { UserData } from "../data/UserData";
import { User } from "../types/User";
export class UserBusiness {
    
    userData = new UserData();

    private async verificarEmailExistente(email: string): Promise<boolean>{
        try{
            const users = await this.userData.pegarUsuarioPeloEmailNoBD(email);
            if(users){
                return true;
            }
            return false;
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    private async verificarIdExistente(id: Number):Promise<boolean>{
        try {
            const user = await this.userData.pegarUsuarioPeloIdNoBD(id);
            if(user){
                return true;
            }else{
              return false;  
            }
        } catch (error:any) {
            throw new Error(error.message);
        }
    }

    private async verificarPetVinculado(idDoUsuario: Number){
        try{
            const usuariosComPetVinculados = await this.userData.pegarUsuarioComPetsVinculadosNoBD(idDoUsuario);
            if(usuariosComPetVinculados){
                return true;
            }else{
                return false;
            }
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    public async pegarUsuarioPeloId(userId: Number): Promise<User | null> {
        try{
            const user = await this.userData.pegarUsuarioPeloIdNoBD(userId);
            return user;
        }catch(error: any){
            throw error;
        }
    }

    public async pegarTodosUsuarios(): Promise<User[]> {
        try{
            const users = await this.userData.pegarTodosUsuariosNoBD();
            return users;
        }catch(error: any){
            throw new Error(error.message);
        }
    }
    
    public async postarNovoUsuario( name: string, email: string): Promise<User>{
        try{
            const emaiIsTrue = await this.verificarEmailExistente(email);
            if(emaiIsTrue){
                throw new Error("Email já existente");
            }

            const newUser = await this.userData.criarUsuarioNoBancoDeDados(name, email);
            return newUser;
            
        }catch(error:any){
            throw new Error(error.message);
        }
    }

    public async atualizarUsuario(id: Number, updateName: string, updateEmail: string): Promise<User>{
        try{
            const emaiIsTrue = await this.verificarEmailExistente(updateEmail);
            if(emaiIsTrue){
                throw new Error("Email já existente");
            }
            const idIsTrue = await this.verificarIdExistente(id);
            if(idIsTrue){
                const userUpdate = await this.userData.atualizarUsuarioNoBancoDeDados(id,updateName,updateEmail)
                return userUpdate;
            }else{
                throw new Error("Falha ao encontrar usuário: Número vinculado a nenhum usuário!");
            }
        }catch(error: any){
            throw new Error(error.message)
        }
    }

    public async deletarUsuario(id: Number): Promise<any>{
        try{
            const idExiste = await this.verificarIdExistente(id);
            const temPetVinculado = await this.verificarPetVinculado(id);
            if(!idExiste){
                throw new Error("Falha ao encontrar usuário: Número vinculado a nenhum usuário!");
            }else if(temPetVinculado){
                throw new Error("Falha ao excluir: Usuário tem pet(s) vinculados!");
            }else{
                await this.userData.deletarUsuarioNoBancoDeDados(id);
            }
        }catch(error: any){
            throw new Error(error.message);
        }
    }
}