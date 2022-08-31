import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cadastro',
    //vai carregar um modulo filho
                    //chamada pra fazer a importação dinamica
                                                            //e quando carregar devolve o modulo
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    // Criar o componente da home e colocar a validação de acesso
    path: '',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: 'cadastro/login', redirectTo: 'login' },
];

@NgModule({
                        //modulo raiz
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
