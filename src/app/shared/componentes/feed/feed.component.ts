import { Component, OnInit } from '@angular/core';
import { Postagem } from '../../tipos/postagem.type';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  public postagens: Array<Postagem> = [
    {
      usuario: {
        nome: 'Franz Kafka'
      },
      comentarios: [
        {
          nome: 'Felipe Teles',
          comentario: 'Tu é muito feio kkkkkkk'
        },
        {
          nome: 'Rodrigo Pontes',
          comentario: 'OMG'
        }
      ],
      foto: 'assets/img/postsExemplo/franskafka.jpg',
      quantidadeCurtidas: 45,
      descricao: 'Foto minha tirada na Alemanha para publicacao do meu primeiro livro. lembro como se fosse ontem o frio na barriga que eu tive quando estava indo para o estudio'
    } as Postagem,
    {
      usuario: {
        nome: 'Michelangelo'
      },
      comentarios: [
        {
          nome: 'Felipe Teles',
          comentario: 'Obra de arte'
        },
        {
          nome: 'Rodrigo Pontes',
          comentario: 'beautiful'
        }
      ],
      foto: 'assets/img/postsExemplo/Allori_Venus_Cupido.jpg',
      quantidadeCurtidas: 644,
      descricao: 'releitura da minha obra Venus e Cupido'
    } as Postagem
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
