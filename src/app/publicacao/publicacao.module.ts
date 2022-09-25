import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicacaoRoutingModule } from './publicacao-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PublicacaoComponent } from './publicacao.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PublicacaoComponent
  ],
  imports: [
    CommonModule,
    PublicacaoRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PublicacaoModule { }
