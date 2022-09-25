import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AutenticacaoService } from 'src/app/shared/autenticacao/autenticacao.service';
import { Postagem } from '../../tipos/postagem.type';
import { UsuarioDevagram } from '../../tipos/usuario-devagram.type';
import { UsuarioLogado } from '../../tipos/usuario-logado.type';
import { FeedService } from './feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnChanges {
  @Input() usuario?: UsuarioDevagram | null;
  public usuarioLogado: UsuarioLogado | null;
  public postagens: Array<Postagem> = [
    //   {
    //     usuario: {
    //       nome: 'Franz Kafka'
    //     },
    //     comentarios: [
    //       {
    //         nome: 'Felipe Teles',
    //         comentario: 'Tu é muito feio kkkkkkk'
    //       },
    //       {
    //         nome: 'Rodrigo Pontes',
    //         comentario: 'OMG'
    //       }
    //     ],
    //     foto: 'assets/img/postsExemplo/franskafka.jpg',
    //     quantidadeCurtidas: 45,
    //     descricao: 'Foto minha tirada na Alemanha para publicacao do meu primeiro livro. lembro como se fosse ontem o frio na barriga que eu tive quando estava indo para o estudio'
    //   } as Postagem,
    //   {
    //     usuario: {
    //       nome: 'Michelangelo'
    //     },
    //     comentarios: [
    //       {
    //         nome: 'Felipe Teles',
    //         comentario: 'Obra de arte'
    //       },
    //       {
    //         nome: 'Rodrigo Pontes',
    //         comentario: 'beautiful'
    //       }
    //     ],
    //     foto: 'assets/img/postsExemplo/Allori_Venus_Cupido.jpg',
    //     quantidadeCurtidas: 644,
    //     descricao: 'releitura da minha obra Venus e Cupido'
    //   } as Postagem
  ];

  constructor(
    private servicoAutenticacao: AutenticacaoService,
    private servicoFeed: FeedService
  ) {
    this.usuarioLogado = this.servicoAutenticacao.obterUsuarioLogado();
  }

  //Quando algo for alterado
  ngOnChanges(changes: SimpleChanges): void {
    //console.log({ changes });

    if (changes['usuario'].previousValue !== changes['usuario'].currentValue) {
      this.carregarPostagens();
    }
  }

  // Quando carregar
  ngOnInit(): void {
    this.carregarPostagens();
  }

  async carregarPostagens() {
    try {
      let idUsuario = '';
      if (this.usuario === null) {
        return;
      } else if (this.usuario) {
        idUsuario = this.usuario._id;
      }

      //console.log('chamar a api')
      const postagensApi = await this.servicoFeed.carregarPostagens(
        this.usuario?._id
      );

      this.postagens = postagensApi.map(
        (postagem) =>
          ({
            //pegas todas as propriedas do objeto postagem
            //e coloca nesse objeto
            ...postagem,
            usuario: postagem.usuario || {
              nome: this.usuario?.nome,
              avatar: this.usuario?.avatar,
            },
            estaCurtido: postagem.likes.includes(this.usuarioLogado?.id || ''),
            quantidadeCurtidas: postagem.likes.length,
          } as Postagem)
      );
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao carregar o feed.');
    }
  }
}
