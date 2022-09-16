
//Guardas da rota(documentação do angular)
//Classe que implementa uma interface especial e
//cada uma delas fornece uma validação em uma etapa diferente da rota
//Basicamente saber se o cara pode acessar a rota
//Para isso usaremos a interface CanActivate
//que verifica se o usuario pode acessar a rota ou nao

import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AutenticacaoService } from "./autenticacao.service";

@Injectable({
    providedIn: 'root'
})

    //Dice: passar o mouse em cima e ativar a correção rapida
export class AutenticacaoGuard implements CanActivate{
    constructor(
        private servicoAutenticacao: AutenticacaoService,
        private router: Router
    ){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        //Saber se o usuariio esta logado
        if (this.servicoAutenticacao.estaLogado()) {
            return true;
        }

        return this.router.parseUrl('login'); //busca no modulo de roteamento quem esta resposdendo pelo modulo de login
    }
}

