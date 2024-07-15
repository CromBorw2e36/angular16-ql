import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DxSelectBoxComponent, DxSelectBoxTypes } from 'devextreme-angular/ui/select-box';
import { ValueChangedEvent } from 'devextreme/ui/select_box';

@Component({
  selector: 'control-select-box-component',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent {
  constructor() {
    this.propertyControl = {
      placeholder: 'Enter value here',
      showClearButton: true,
      inputAttr: { 'aria-label': 'Full Name' },
    };
  }

  ngAfterViewInit(): void {
    if (this.dxSelectBoxComponent !== undefined) {
      this.dxSelectBoxComponent.instance.option(this.propertyControl)
    }
  }

  @Input() propertyControl: DxSelectBoxTypes.Properties;
  @Input() dataSource: any[] = [];
  @Input() value!: any;
  @Input() valueExpr!: string;
  @Input() displayExpr!: string;
  @Input() label!: string;

  @Output() onValueChanged = new EventEmitter<any>();
  @Output() valueChange = new EventEmitter<any>();
  @Output() valueNameChange = new EventEmitter<any>();
  @ViewChild('dxSelectBoxComponent') dxSelectBoxComponent: DxSelectBoxComponent | undefined;

  handleValueChange(ev: ValueChangedEvent) {
    const data = ev.value;
    // console.log(ev);
    this.onValueChanged.emit(ev);
    this.valueChange.emit(data);
    const findItem = this.dataSource.find(x => x[this.valueExpr] === data);
    if (findItem && this.valueExpr.endsWith('_id')) {
      // const dataField = this.valueExpr.replace('_id', '_name');
      this.valueNameChange.emit(findItem['name']);
    }
  }

}
