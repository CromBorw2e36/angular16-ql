import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxCheckBoxComponent } from 'devextreme-angular';
import { DxCheckBoxTypes } from 'devextreme-angular/ui/check-box';

@Component({
  selector: 'control-check-box-component',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent {

  constructor() {
    this.propertyControl = {

    }
  }

  ngAfterViewInit(): void {
    if (this.dxCheckBoxComponent !== undefined) {
      this.dxCheckBoxComponent.instance.option(this.propertyControl)
    }
  }

  @Input() propertyControl: DxCheckBoxTypes.Properties;
  @Input() value!: boolean | undefined;
  @Input() label!: string;

  @Output() valueChange = new EventEmitter<any>();

  @ViewChild('dxCheckBox') dxCheckBoxComponent: DxCheckBoxComponent | undefined;
}
