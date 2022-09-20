import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/shared/autenticacao/autenticacao.service';
import { Postagem } from '../../tipos/postagem.type';
import { UsuarioLogado } from '../../tipos/usuario-logado.type';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public usuarioLogado: UsuarioLogado | null;
  public postagens: Array<Postagem> = [];

  constructor(
    private servicoAutenticacao: AutenticacaoService,
    private servicoFeed: FeedService
  ) { 
    this.usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();
  }

  async ngOnInit(): Promise<void> {
    try {
      //console.log('chamar a api')
      const postagens = await this.servicoFeed.carregarPostagens();
      this.postagens = postagens;
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao carregar o feed.');
    }
  }
}
