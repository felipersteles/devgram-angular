import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonComponent } from './componentes/button/button.component';
import { AvatarComponent } from './componentes/avatar/avatar.component';
import { UploadImagemComponent } from './componentes/upload-imagem/upload-imagem.component';
import { InputPublicoComponent } from './componentes/public/input-publico/input-publico.component';
import { FormsModule } from '@angular/forms';
import { PaginaPublicaComponent } from './componentes/public/pagina-publica/pagina-publica.component';
import { RodapePaginaPublicaComponent } from './componentes/public/rodape-pagina-publica/rodape-pagina-publica.component';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DevagramApiInterceptador } from './services/devagram-api-interceptor.service';
import { FeedComponent } from './componentes/feed/feed.component';
import { PostagemComponent } from './componentes/feed/postagem/postagem.component';
import { CabecalhoComponent } from './layout/cabecalho/cabecalho.component';
import { NavegacaoComponent } from './layout/navegacao/navegacao.component';
import { RodapeComponent } from './layout/rodape/rodape.component';



@NgModule({
  providers: [
    {
      provide: 'DEVAGRAM_URL_API',
      useValue: environment.devagramUrlApi
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DevagramApiInterceptador,
      multi: true //podemos ter mais de um interceptador
    }
  ],
  declarations: [
    ButtonComponent,
    AvatarComponent,
    UploadImagemComponent,
    InputPublicoComponent,
    PaginaPublicaComponent,
    RodapePaginaPublicaComponent,
    FeedComponent,
    PostagemComponent,
    CabecalhoComponent,
    NavegacaoComponent,
    RodapeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, //forms stuffs
    RouterModule, //alternar entre rotas
    HttpClientModule, //Importacao para uso da API
  ],
  exports: [
    ButtonComponent,
    AvatarComponent,
    UploadImagemComponent,
    InputPublicoComponent,
    PaginaPublicaComponent,
    RodapePaginaPublicaComponent,
    FeedComponent,
    CabecalhoComponent,
    RodapeComponent
  ]
})
export class SharedModule { }
