import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicacaoService } from './publicacao.service';

@Component({
  selector: 'app-publicacao',
  templateUrl: './publicacao.component.html',
  styleUrls: ['./publicacao.component.scss']
})
export class PublicacaoComponent implements OnInit {

  public form: FormGroup;
  public etapaAtual: number = 1; //alterar entre upload de imagem e upload de texto
  public imagemPrevisualizacao?: string;
  public estaFazendoRequisicaoParaBackend: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicoPublicacao: PublicacaoService
  ) {
    this.form = this.fb.group({
    file: [null, Validators.required],
    descricao: [null, [Validators.required, Validators.minLength(3)]]
  });}

  ngOnInit(): void {
  }

  public obterReferenciaInput(nomeInput: string): AbstractControl {
    return this.form.controls[nomeInput];
  }

  public obterImagemEsquerda(): string {
    if (this.estaNaSegundaEtapa()) {
      return 'assets/img/icones/seta_esq.svg';
    }

    return '';
  }

  public obterTextoAcaoDireita() {
    if (this.estaNaSegundaEtapa()) {
      return 'Compartilhar';
    }

    if (this.obterReferenciaInput('file').value) {
      return 'Avançar';
    }

    return '';
  }

  public estaNaPrimeiraEtapa() {
    return this.etapaAtual === 1;
  }

  public estaNaSegundaEtapa() {
    return this.etapaAtual === 2;
  }

  public manipularCliqueAcaoEsquerda() {
    if (this.estaNaSegundaEtapa()) {
      this.etapaAtual = 1;
    }
  }

  public manipularCliqueAcaoDireita() {
    if (this.estaNaSegundaEtapa()) {
      this.cadastrarPublicacao();
      return;
    }

    this.etapaAtual = 2;
  }

  private async cadastrarPublicacao() {
    //console.log('cadastrar publi')

    //fazer o controle do cadastro
    if (this.form.invalid) return;
    if(this.estaFazendoRequisicaoParaBackend) return;

    this.estaFazendoRequisicaoParaBackend = true;

    try {
      const valoresFormulario = this.form.value;
      const dadosFormulario = new FormData();

      dadosFormulario.append('file', valoresFormulario.file);
      dadosFormulario.append('descricao', valoresFormulario.descricao);

      //chamar a API utilizando para usar o POST
      await this.servicoPublicacao.publicar(dadosFormulario);
      this.router.navigateByUrl('/'); //voltar para o feed apos publicação
      this.estaFazendoRequisicaoParaBackend = false;
    } catch (e: any) {
      alert(e.error?.erro || 'Erro ao cadastrar a publicação!');
    }
  }

  public verificarHabilitacaoAcaoDireita(): boolean {
    return (this.estaNaSegundaEtapa() && this.form.invalid && !this.estaFazendoRequisicaoParaBackend);
  }

  public armazenarImagemPrevisualizacao(imgPrevisualizacao: string) {
    this.imagemPrevisualizacao = imgPrevisualizacao;
  }

  public obterImagemPrevisualizacao() {
    if (this.imagemPrevisualizacao) {
      return this.imagemPrevisualizacao;
    }

    return 'assets/img/icones/imagemPublicacao.svg';
  }

  public obterClasseCssCabecalho() {
    if (this.obterReferenciaInput('file').value) {
      return 'cabecalhoComAcoesPublicacao';
    }

    return '';
  }
}

