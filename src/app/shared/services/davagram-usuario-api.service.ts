import { Injectable } from '@angular/core';
import { UsuarioDevagram } from '../tipos/usuario-devagram.type';
import { DevagramApiService } from './devagram-api.service';

@Injectable({
  providedIn: 'root',
})
export class DevagramUsuarioApiService extends DevagramApiService {
  public buscarDadosUsuario(): Promise<UsuarioDevagram> {
    return this.get('usuario'); //esperando a URL da api que faz a chamada no backend
  }

  public pesquisarUsuarios(filtro: string): Promise<Array<UsuarioDevagram>> {
    return this.get('pesquisa?filtro=' + filtro); //concatena o filtro com o url
  }

  public obterInformacoesDoPerfil(idUsuario: string): Promise<UsuarioDevagram> {
    return this.get('pesquisa?id=' + idUsuario);
  }

  public alternarSeguir(idUsuario: string) {
    return this.put('seguir?id=' + idUsuario, {});
  }

  public atualizarPerfil(dados: any) {
    return this.put('usuario', dados);
  }
}
