import { Injectable } from '@angular/core';
import { DevagramApiService } from '../../services/devagram-api.service';
import { Postagem } from '../../tipos/postagem.type';
import { RespostaApiDevagram } from '../../tipos/resposta-api-devagram.type';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends DevagramApiService{

  //metodo que carrega postagens
  async carregarPostagens(idUsuario?: string): Promise<Array<Postagem>> {
    return this.get( //get é o metodo generico da API caso queira saber mais só me perguntar :)
      'feed' + (idUsuario ? `?id=${idUsuario}`: '')
    );
  }

  async alternarCurtida(idPostagem: string): Promise<RespostaApiDevagram>{
   return this.put(`like?id=${idPostagem}`, {})
  }
  
  async addComentario(idPostagem: string, comentario: string): Promise<RespostaApiDevagram>{
    return this.put(`comentario?id=${idPostagem}`,
      {
        //comentario: comentario 
        //mas como o nome da variavel tem o mesmo nome do valor da propriedade pode ser
        //feito da seguinte forma:
        comentario //passando o body da requisição da api
      }
    )
  }
}
