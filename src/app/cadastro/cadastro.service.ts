import { Injectable } from '@angular/core';
import { DevagramApiService } from '../shared/services/devagram-api.service';
import { RespostaApiDevagram } from '../shared/tipos/resposta-api-devagram.type';

@Injectable({
  providedIn: 'root'
})
  
export class CadastroService extends DevagramApiService {

  //não é necessario o construtor do objeto pois ja foi feito na classe pai
  //constructor() { }

  cadastrar(dadosCadastro: FormData): Promise<RespostaApiDevagram> {
    return this.post('cadastro', dadosCadastro);
  }
}
