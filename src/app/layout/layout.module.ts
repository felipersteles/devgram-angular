import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NavegacaoComponent } from './navegacao/navegacao.component';
import { RodapeComponent } from './rodape/rodape.component';



@NgModule({
  declarations: [
    CabecalhoComponent,
    NavegacaoComponent,
    RodapeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CabecalhoComponent,
    NavegacaoComponent,
    RodapeComponent
  ]
})
export class LayoutModule { }
