import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutenticacaoService } from '../shared/autenticacao/autenticacao.service';
import { DevagramUsuarioApiService } from '../shared/services/davagram-usuario-api.service';
import { UsuarioDevagram } from '../shared/tipos/usuario-devagram.type';
import { UsuarioLogado } from '../shared/tipos/usuario-logado.type';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
  
export class PerfilComponent implements OnInit {

  public usuario?: UsuarioDevagram | null = null;
  private usuarioLogado?: UsuarioLogado | null;

  constructor(
    private servicoRotaAtual: ActivatedRoute,
    private servicoUsuario: DevagramUsuarioApiService,
    private servicoAutenticacao: AutenticacaoService
  ) { this.usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado(); }

  ngOnInit(): void {
    //escutando a mudança de rota
    this.servicoRotaAtual.params.subscribe(params => {
      let idUsuarioUrl = params['idUsuario'];
      console.log(idUsuarioUrl);
      if (idUsuarioUrl === 'pessoal') {
        idUsuarioUrl = this.usuarioLogado?.id;
      }

      this.carregarPerfilDoUsuario(idUsuarioUrl);
    });
  }

  async carregarPerfilDoUsuario(idUsuario?: string) {
    try {

      if (!idUsuario) return;
      this.usuario = await this.servicoUsuario.obterInformacoesDoPerfil(idUsuario);

    } catch (err: any) {
      alert(err.error?.erro || 'Erro ao carregar o perfil')
    }
  }
}
