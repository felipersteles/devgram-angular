import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from '../shared/autenticacao/autenticacao.service';

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
  constructor(
    private fb: FormBuilder,
    private servicoAutenticacao: AutenticacaoService
  ) {
    this.form = this.fb.group({
      login: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
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

  //por ser async precisa deveolver uma Promise
  public async submit(): Promise<void>{
    //console.log(this.form.value);
    if (this.form.invalid) {
      alert('Preencha os dados corretamente!');
      return;
    }

    // Integracao com a API
    try {
      await this.servicoAutenticacao.login(
        this.form.value
      );
    } catch(excecao: any) {
      const mensagemErro = excecao?.error?.erro || 'Erro ao realizar o login'
      alert(mensagemErro);
    }
  }

}
