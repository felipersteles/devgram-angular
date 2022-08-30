import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() public texto?: string;
  @Input() public cor: string = 'primaria';
  @Input() public classeCss: string = '';
  @Input() public tipo: string = 'button';
  @Input() public isDisabled: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
