import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxDateBoxComponent, DxDateBoxTypes } from 'devextreme-angular/ui/date-box';
import { ValueChangedEvent } from 'devextreme/ui/date_box';
import * as moment from 'moment';

@Component({
  selector: 'control-date-box-component',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.scss']
})
export class DateBoxComponent {

  constructor() {
    this.propertyControl = {
      placeholder: 'Enter text here',
      showClearButton: true,
      inputAttr: { 'aria-label': 'Full Name' },
    } as DxDateBoxTypes.Properties;
  }

  ngAfterViewInit(): void {
    if (this.dxDateBoxComponent !== undefined) {
      this.dxDateBoxComponent.instance.option(this.propertyControl)
    }
  }

  @Input() propertyControl: DxDateBoxTypes.Properties;
  @Input() value!: string | number | Date;
  @Input() label!: string;

  @Output() valueChange = new EventEmitter<string | Number | Date >();

  @ViewChild('dxDateBox') dxDateBoxComponent: DxDateBoxComponent | undefined;

}
