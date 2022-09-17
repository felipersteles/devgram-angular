import { Injectable } from "@angular/core";
import { UsuarioDevagram } from "../tipos/usuario-devagram.type";
import { DevagramApiService } from "./devagram-api.service";

@Injectable({
    providedIn: 'root'
})

export class DevagramUsuarioApiService extends DevagramApiService{
    buscarDadosUsuario(): Promise<UsuarioDevagram> {
        return this.get('usuario'); //esperando a URL da api que faz a chamada no backend
    }

    pesquisarUsuarios(filtro: string): Promise<Array<UsuarioDevagram>> {
        return this.get('pesquisa?filtro=' + filtro); //concatena o filtro com o url
    }
}

