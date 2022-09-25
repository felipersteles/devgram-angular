import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroModule } from './cadastro/cadastro.module';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { PerfilModule } from './perfil/perfil.module';
import { PublicacaoComponent } from './publicacao/publicacao.component';
import { PublicacaoModule } from './publicacao/publicacao.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    LoginModule,
    CadastroModule,
    PerfilModule,
    PublicacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
