import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-publica',
  templateUrl: './pagina-publica.component.html',
  styleUrls: ['./pagina-publica.component.scss']
})
export class PaginaPublicaComponent implements OnInit {

  @Input() public classeCss: string = '';
  @Input() public classeCssLogo: string = '';

  @Input() public textoBotaoSubmit?: string;

  constructor() { }

  ngOnInit(): void {
  }

  public aoSubmeter(): void{
    
  }
}
