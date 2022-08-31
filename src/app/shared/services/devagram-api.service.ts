import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DevagramApiService {

  constructor(protected http: HttpClient,
    @Inject('DEVAGRAM URL API') private devagramUrlApi: string
  ) { 
    
  }
  
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

  private obterUrl(url: string): string{
    return `${this.devagramUrlApi}/${url}`;
  }
}
