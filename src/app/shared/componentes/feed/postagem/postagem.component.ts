import { Component, Input, OnInit } from '@angular/core';
import { Postagem } from 'src/app/shared/tipos/postagem.type';
import { UsuarioLogado } from 'src/app/shared/tipos/usuario-logado.type';

const limiteCaracteresDescricao = 75; 

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.scss']
})
export class PostagemComponent implements OnInit {

  @Input() postagem: Postagem = {} as Postagem; 
  @Input() usuarioLogado: UsuarioLogado | null = null;

  public quantidadeLinhasTextarea: number = 1;
  public comentarioAtual: string = '';
  public deveExibirCaixaComentario: boolean = true;
  public limiteCaracteresDescricao: number = limiteCaracteresDescricao;
  public estaFazendoRequisicaoParaBackend: boolean = false;

  constructor(
    //private servicoFeed: FeedService
  ) { }

  ngOnInit(): void {
  }

  public exibirDescricaoCompleta() {
    //console.log('exibir descricao completa')
    this.limiteCaracteresDescricao = 999990;
  }

  public obterImagemCurtida() {
    const iconeBase = this.postagem.estaCurtido
      ? 'curtir_active'
      : 'curtir';

    return `assets/img/icones/${iconeBase}.svg`;
  }

  public obterImagemComentario() {
    const iconeBase = this.deveExibirCaixaComentario
      ? 'comentar_active'
      : 'comentar';
    
    return `assets/img/icones/${iconeBase}.svg`;
  }

  public exibirCaixaComentario() {
    this.deveExibirCaixaComentario = !this.deveExibirCaixaComentario;
  }

  public async fazerComentario() {
    console.log('Comentar');
    // if (!this.validarComentario()) {
    //   return;
    // }

    // this.estaFazendoRequisicaoParaBackend = true;

    // try {
    //   await this.servicoFeed.adicionarComentario(
    //     this.postagem._id,
    //     this.comentarioAtual
    //   );

    //   this.postagem.comentarios.push({
    //     comentario: this.comentarioAtual,
    //     nome: this.usuarioLogado?.nome!
    //   });

    //   this.comentarioAtual = '';
    //   this.deveExibirCaixaComentario();
    // } catch (e: any) {
    //   alert(e.error?.erro || 'Erro ao realizar o comentario!');
    //}

    //this.estaFazendoRequisicaoParaBackend = false;
  }

  public verificarQuantidadeLinhas() {
    this.quantidadeLinhasTextarea = this.comentarioAtual.length > 0
      ? 2
      : 1;
  }

  public validarComentario(): boolean {
    return (
      !this.estaFazendoRequisicaoParaBackend
      && this.comentarioAtual.trim().length >= 3
    );
  }
}
