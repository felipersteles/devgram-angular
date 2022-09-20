import { Injectable } from '@angular/core';
import { DevagramApiService } from '../../services/devagram-api.service';
import { Postagem } from '../../tipos/postagem.type';

@Injectable({
  providedIn: 'root'
})
export class FeedService extends DevagramApiService{

  //metodo que carrega postagens
  carregarPostagens(): Promise<Array<Postagem>> {
    return this.get('feed'); //get é o metodo generico da API
  }
}
