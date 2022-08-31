import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { iif } from 'rxjs';
import { confirmacaoSenha } from '../../validadores/confirmacao-senha.validator';

@Component({
  selector: 'app-input-publico',
  templateUrl: './input-publico.component.html',
  styleUrls: ['./input-publico.component.scss']
})
export class InputPublicoComponent implements OnInit {

  @Input() public referenciaFormulario?: AbstractControl;
  @Input() public imagem?: string;
  @Input() public tipo?: string;
  @Input() public placeHolder?: string;

  constructor() { }

  ngOnInit(): void {
  }

  public aoModificarCampo(event: any): void {
    //console.log(event)
    this.referenciaFormulario?.setValue(event);
    this.referenciaFormulario?.markAsDirty();
  }

  public obterMensagemDeErro(): string{
    if (!this.referenciaFormulario?.errors) {
      return '';
    }

    if (this.referenciaFormulario?.errors['required']) {
      return 'Campo Obrigatorio';
    }

    if (this.referenciaFormulario?.errors['email']) {
      return 'Insira um e-mail válido!';
    }

    if (this.referenciaFormulario?.errors['minlength']) {
      return `Deve ter no mínimo ${this.referenciaFormulario?.errors['minlength'].requiredLength} caracteres`;
    }

    if (this.referenciaFormulario?.errors['confirmacaoSenha']) {
      return 'As senhas não conferem!';
    }

    return 'Problema maluco';
  }
}
