import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DevagramUsuarioApiService } from '../services/davagram-usuario-api.service';
import { DevagramApiService } from '../services/devagram-api.service';
import { UsuarioLogado } from '../tipos/usuario-logado.type';
import { CredenciaisDevagram } from './credenciais-devagram.type';
import { RespostaLoginDevagram } from './resposta-login-devagram.type';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService extends DevagramApiService{

  //Resolve o construtor sobrescrevendo o construtor da classe pai
  //Feito para que haja o redirecionamento de rotas
  constructor(
    protected _http: HttpClient,
    @Inject('DEVAGRAM_URL_API') private _devagramUrlApi: string,
    private router: Router,
    private usuarioApiService: DevagramUsuarioApiService
  ) {
    super(_http, _devagramUrlApi);
  }

  async login(credenciais: CredenciaisDevagram): Promise<void> {
    //vai ser igual a aguarde um post pra api login passando as credenciais
    const repostaLogin: RespostaLoginDevagram = await this.post('login', credenciais);

    if (!repostaLogin.token) {
      throw new Error('Login inválido!');
    }

    //armazenando na propriedade localstroage no proprio navegador
    localStorage.setItem('token', repostaLogin.token); //so aceita string
    localStorage.setItem('nome', repostaLogin.nome);
    localStorage.setItem('email', repostaLogin.email);

    //pegar os dados complementares do usuario logado
    const dadosUsuario = await this.usuarioApiService.buscarDadosUsuario(); //ele é uma função que devolve dados assincronos por isso o await
    localStorage.setItem("id", dadosUsuario._id);

    if (dadosUsuario.avatar) {
      localStorage.setItem("avatar", dadosUsuario.avatar);
    }

    //redirecionando para a rota home
    this.router.navigateByUrl('/');
  }

  estaLogado(): boolean{
    return localStorage.getItem('token') !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('avatar');
    localStorage.removeItem('id');

    //redirecionar para tela de login
    this.router.navigateByUrl('/login');
  }

  // metodo para devolver as infos do usuario logado
  obterUsuarioLogado(): UsuarioLogado | null {
    if (!this.estaLogado())
      return null;
    
    return {
      id: localStorage.getItem('id'),
      nome: localStorage.getItem('nome'),
      email: localStorage.getItem('email'),
      avatar: localStorage.getItem('avatar')
    } as UsuarioLogado;
  }
}
