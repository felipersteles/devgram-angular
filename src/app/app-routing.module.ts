import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './autenticacao/guarda-autenticacao.guard';

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
    path: '',
    canActivate: [AutenticacaoGuard], //validação de acesso
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
                        //modulo raiz
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
