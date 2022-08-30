import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: CadastroComponent
  }
];

@NgModule({
                        //modulo filho
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
