import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevagramApiService {

  constructor(
    protected http: HttpClient, //classe utilizada para fazer a requisição da API
    @Inject('DEVAGRAM_URL_API') private devagramUrlApi: string
  ) { }
  
  //classe generica
  public post(url: string, body: any): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.post(
        this.obterUrl(url),
        body
      ).subscribe({
        next: v => resolve(v), //caso de sucesso
        error: e => reject(e) //caso de erro
      })
    });
  }

  //classe generica
  public get(url: string): Promise<any>{
    return new Promise((resolve, reject) => {
      this.http.get(
        this.obterUrl(url)
      ).subscribe({
        next: v => resolve(v),
        error: e=> reject(e)
      })
    });
  }

  private obterUrl(url: string): string {
    return `${this.devagramUrlApi}/${url}`;
  }
}
