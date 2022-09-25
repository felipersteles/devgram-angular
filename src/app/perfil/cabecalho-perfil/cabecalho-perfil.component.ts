
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AutenticacaoService } from 'src/app/shared/autenticacao/autenticacao.service';
import { DevagramUsuarioApiService } from 'src/app/shared/services/davagram-usuario-api.service';
import { UsuarioDevagram } from 'src/app/shared/tipos/usuario-devagram.type';

@Component({
  selector: 'app-cabecalho-perfil',
  templateUrl: './cabecalho-perfil.component.html',
  styleUrls: ['./cabecalho-perfil.component.scss']
})
export class CabecalhoPerfilComponent implements OnInit {

  @Input() usuario?: UsuarioDevagram | null = null;
  public estaPerfilPessoal: boolean = false;

  constructor(
    private router: Router,
    private rotaAtiva: ActivatedRoute,
    private servicoUsuario: DevagramUsuarioApiService,
    private servicoAutenticacao: AutenticacaoService
  ) { }

  ngOnInit(): void {
    this.rotaAtiva.url.subscribe(() => {
      if (this.router.url === '/perfil/pessoal') {
        this.estaPerfilPessoal = true;
      }
    })
  }

  public async manipularCliqueBotaoPrincipal(): Promise<void> {
    if (this.estaPerfilPessoal) {
      this.redirecionarParaTelaDeEdicaoDePerfil();
      return;
    }

    await this.alternarSeguir();
  }

  public redirecionarParaTelaDeEdicaoDePerfil(): void {
    this.router.navigateByUrl('/perfil/pessoal/editar');
  }

  private async alternarSeguir() {
    if (!this.usuario) {
      return;
    }

    try {
      await this.servicoUsuario.alternarSeguir(this.usuario._id);
      if (this.usuario.segueEsseUsuario) {
        this.usuario.seguidores--;
      } else {
        this.usuario.seguidores++;
      }

      this.usuario.segueEsseUsuario = !this.usuario.segueEsseUsuario;
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao seguir/deixar de seguir o usuário!');
    }
  }

  public obterCorBotaoPrincipal(): string {
    if (this.usuario?.segueEsseUsuario || this.estaPerfilPessoal) {
      return 'outline';
    }

    return 'primaria';
  }

  public obterTextoBotaoPrincipal(): string {
    if (this.estaPerfilPessoal) {
      return 'Editar perfil';
    }

    if (this.usuario?.segueEsseUsuario) {
      return 'Deixar de seguir';
    }

    return 'Seguir';
  }

  public voltarParaHome() {
    this.router.navigateByUrl('/');
  }

  public logout(): void {
    this.servicoAutenticacao.logout();
  }
}
