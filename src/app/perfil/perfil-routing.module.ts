import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { PerfilComponent } from './perfil.component';

const routes: Routes = [
  {
    path: 'pessoal/editar',
    component: EditarPerfilComponent
  },
  {
    path: ':idUsuario', //rota esperando o id usuario
    component: PerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
