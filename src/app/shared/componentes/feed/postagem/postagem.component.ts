import { Component, Input, OnInit } from '@angular/core';
import { Postagem } from 'src/app/shared/tipos/postagem.type';
import { UsuarioLogado } from 'src/app/shared/tipos/usuario-logado.type';
import { FeedService } from '../feed.service';

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
  public deveExibirCaixaComentario: boolean = false;
  public limiteCaracteresDescricao: number = limiteCaracteresDescricao;

  //variavel de controle para evitar varias requisições ao mesmo tempo
  public estaFazendoRequisicaoParaBackend: boolean = false;

  constructor(
    private servicoFeed: FeedService
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
    //console.log('Comentar');

    this.estaFazendoRequisicaoParaBackend = true;

    try {
      await this.servicoFeed.addComentario(
        this.postagem._id,
        this.comentarioAtual
      );

      //espera uma variavel do tipo comentario
      //vantagens de usar uma tipagem forte
      this.postagem.comentarios.push({
        comentario: this.comentarioAtual,
        nome: this.usuarioLogado?.nome!
      });

     //apos comentar limpar comentario e fechar a caixa
      this.comentarioAtual = ''; 
      this.exibirCaixaComentario();
    } catch (err: any) {
      alert(err.error?.erro || 'Erro ao realizar comentario')
    }

    this.estaFazendoRequisicaoParaBackend = false;
  }

  public verificarQuantidadeLinhas() {
    this.quantidadeLinhasTextarea = this.comentarioAtual.length > 0
      ? 2
      : 1;
  }

  public validarComentario(): boolean {
    return (
      !this.estaFazendoRequisicaoParaBackend
      && this.comentarioAtual.trim().length >= 1 //metodo trim serve para retirar os espaços do comentario
    );
  }

  public async manipularCurtidas(): Promise<any>{
    this.estaFazendoRequisicaoParaBackend = true;

    try {
      console.log('curtir')

      //fazendo a alteração na API
      await this.servicoFeed.alternarCurtida(this.postagem._id);

      //esta exclamação serve pra forçar que a variavel não pode ser undefined
      if (this.postagem.estaCurtido) this.postagem.quantidadeCurtidas!--      
      else this.postagem.quantidadeCurtidas!++
        
      //alternar variavel
      this.postagem.estaCurtido = !this.postagem.estaCurtido
    } catch (err: any) {
      alert(err.error?.erro || 'Erro ao curtir/descurtir'); 
      
    }

    this.estaFazendoRequisicaoParaBackend = false;
  }
}
