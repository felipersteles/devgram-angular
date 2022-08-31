import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {




   
  //pra que serve
  //tantos códigos?
  //se a vida
  //não e programada
  //e as melhores coisas
  //não tem lógica ://



   

  public form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      imagem: [null],
      login: ['', Validators.required],
      senha: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  public aoTrocarImagem() {
    console.log('trocaram a imagem');
  }

  public obterReferencia(nomeCampo: string): AbstractControl {
    return this.form.controls[nomeCampo];
  }

  public submit(): void{
    // Integracao com a API
    console.log(this.form.value);
  }

}
