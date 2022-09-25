import { Injectable } from '@angular/core';
import { DevagramApiService } from '../shared/services/devagram-api.service';
import { RespostaApiDevagram } from '../shared/tipos/resposta-api-devagram.type';

@Injectable({
  providedIn: 'root'
})
export class PublicacaoService extends DevagramApiService{
  public publicar(dadosPublicacao: FormData): Promise<RespostaApiDevagram> {
    return this.post('publicacao', dadosPublicacao);
  }
}
