import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/shared/autenticacao/autenticacao.service';
import { DevagramUsuarioApiService } from 'src/app/shared/services/davagram-usuario-api.service';
import { UsuarioDevagram } from 'src/app/shared/tipos/usuario-devagram.type';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  public termoPesquisado: string = '';
  public resultadoDaPesquisa: Array<UsuarioDevagram> = [];

  constructor(
    private router: Router,
    private apiUsuarioDevagram: DevagramUsuarioApiService,
    private servicoAutenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
  }

  public irParaHome() {
    //console.log('ir para home prestou');
    this.router.navigateByUrl('/'); //redireciona para outra pagina sem atualizar a pagina
    //navigate espera um array enquanto navigateByUrl espera o url direto
  }

  //assincrono pq ele pesquisa no backend
  public async pesquisarUsuarios(): Promise<any>{
    //console.log(this.termoPesquisado)

    if (this.termoPesquisado.length < 3)
      return;
    
    try {
      const usuariosRetornados = await this.apiUsuarioDevagram.pesquisarUsuarios(
        this.termoPesquisado
      );

      const usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();
      this.resultadoDaPesquisa = usuariosRetornados.filter(ur => ur._id !== usuarioLogado?.id);

      console.log(usuariosRetornados)
    } catch (e: any) {
      if(e?.status !== 400) //Erro da api
        alert(e?.error.erro || 'Erro ao pesquisar usuarios!') 
    }
  }

  public irParaPerfil(idUsuario: string): void {
    console.log(idUsuario)
  }
}
