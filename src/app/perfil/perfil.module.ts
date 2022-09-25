import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from '../shared/shared.module';
import { CabecalhoPerfilComponent } from './cabecalho-perfil/cabecalho-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PerfilComponent,
    CabecalhoPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
