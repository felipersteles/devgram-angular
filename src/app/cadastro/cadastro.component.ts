import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacaoService } from '../shared/autenticacao/autenticacao.service';
import { confirmacaoSenha } from '../shared/validadores/confirmacao-senha.validator';
import { CadastroService } from './cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private servicoCadastro: CadastroService,
    private autentificacaoService: AutenticacaoService
  ){ //alem de receber o formbuilder tem que recever o serviço de cadastro e de autentificação
    this.form = this.fb.group({
      file: [null],
      nome: ['', [Validators.required, Validators.minLength(3)]], //tamanho minimo 3 caracteres
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
      confirmacaoSenha: ['', [Validators.required, confirmacaoSenha()]],
    })
   }

  ngOnInit(): void {
  }

  public obterReferencia(nomeCampo: string): AbstractControl{
    return this.form.controls[nomeCampo];
  }

  public async aoSubmeter() {
    //console.log('teste submit');
    if (this.form.invalid) {
      alert('Preencha todos os campos corretamente');
      return;
    }

    try {
      const valoresDoFormulario = this.form.value;
      //console.log(valoresDoFormulario); arquivo json
      
      const corpoDaRequisicao = new FormData();
      corpoDaRequisicao.append('nome', valoresDoFormulario.nome);
      corpoDaRequisicao.append('email', valoresDoFormulario.email);
      corpoDaRequisicao.append('senha', valoresDoFormulario.senha);

      if (valoresDoFormulario.file) {
        corpoDaRequisicao.append('file', valoresDoFormulario.file);
      } 

      await this.servicoCadastro.cadastrar(corpoDaRequisicao);
      //alert('cadastro realizado com sucesso');

      // fazer o login
      await this.autentificacaoService.login({
        login: valoresDoFormulario.email,
        senha: valoresDoFormulario.senha
      })

    } catch (excecao: any) {
      const mensagemErro = excecao?.error?.erro || 'Erro ao realizar o cadastro'//esse erro é da api 
      alert(mensagemErro);
    }
  }
}
