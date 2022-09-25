import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoGuard } from './shared/autenticacao/guarda-autenticacao.guard';

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
    path: 'publicacao',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./publicacao/publicacao.module').then(m => m.PublicacaoModule)
  },
  {
    path: 'perfil',
    canActivate: [AutenticacaoGuard],
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule)
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
