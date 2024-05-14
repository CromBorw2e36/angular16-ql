import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxNumberBoxComponent, DxNumberBoxTypes } from 'devextreme-angular/ui/number-box';

@Component({
  selector: 'control-number-box-component',
  templateUrl: './number-box.component.html',
  styleUrls: ['./number-box.component.scss']
})
export class NumberBoxComponent {

  constructor() {
    this.propertyControl = {
      placeholder: 'Enter text here',
      showClearButton: true,
      inputAttr: { 'aria-label': 'Type value is number' },
      showSpinButtons: true,
    };
  }

  ngAfterViewInit(): void {
    if (this.dxNumberBoxComponent !== undefined) {
      this.dxNumberBoxComponent.instance.option(this.propertyControl)
    }
  }

  @Input() propertyControl: DxNumberBoxTypes.Properties;
  @Input() value!: number | undefined;
  @Input() label!: string;

  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('dxNumberBox') dxNumberBoxComponent: DxNumberBoxComponent | undefined;

}
