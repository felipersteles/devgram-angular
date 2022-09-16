import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ButtonComponent } from './button/button.component';
import { AvatarComponent } from './avatar/avatar.component';
import { UploadImagemComponent } from './upload-imagem/upload-imagem.component';
import { InputPublicoComponent } from './public/input-publico/input-publico.component';
import { FormsModule } from '@angular/forms';
import { PaginaPublicaComponent } from './public/pagina-publica/pagina-publica.component';
import { RodapePaginaPublicaComponent } from './public/rodape-pagina-publica/rodape-pagina-publica.component';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DevagramApiInterceptador } from './services/devagram-api-interceptor.service';



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
    RodapePaginaPublicaComponent
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
  ]
})
export class SharedModule { }
