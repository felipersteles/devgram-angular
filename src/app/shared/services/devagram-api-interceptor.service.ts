
//Lógica que interceptar as requisições feitas pro backend
//Durante a interceptação é inserido um token de autorização que fica no localstorage

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { delay, finalize, Observable } from "rxjs";
import { LoadingService } from "../componentes/loading/loading.service";

@Injectable({
    providedIn: 'root'
})

//Implementacao de interface utilizando implements
export class DevagramApiInterceptador implements HttpInterceptor{
    private requisicoesEmAndamento: number = 0;

    constructor(
        private loadingService: LoadingService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requisicoesEmAndamento++;
        if (this.requisicoesEmAndamento === 1) this.loadingService.exibir()
            

        const token = localStorage.getItem('token');
        let novaReq = req;
        if (token) {
            novaReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            })
        }

        //pipe espera uma sequencia de passos que serão
        //executados dps da requisição
        return next.handle(novaReq).pipe(
            delay(2000), // mil milisegundos
            finalize(() => { //finaliza pipe
                this.requisicoesEmAndamento--;
                if(this.requisicoesEmAndamento === 0) this.loadingService.ocultar()
            })
        );
    }
}

//Após implementação é necessario ir ao modulo e disponibilza-la no array de proviiiders