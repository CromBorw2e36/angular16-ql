import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DxTextBoxComponent, DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import ObjectExtension from '../../common/objectExtension';

@Component({
  selector: 'control-text-box-component',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class ControlTextBoxComponent implements OnInit, OnChanges {

  constructor() {
    this.propertyControl = {
      placeholder: 'Enter text here',
      showClearButton: true,
      inputAttr: { 'aria-label': 'Full Name' },
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.value = changes['value'].currentValue;
      if(this.dxTextBoxViewChild){
        this.dxTextBoxViewChild.instance._refresh();
        console.log(this.value)
      }
    }
  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    if (this.dxTextBoxViewChild !== undefined) {
      this.dxTextBoxViewChild.instance.option(this.propertyControl)
    }
  }

  @Input() propertyControl: DxTextBoxTypes.Properties;
  @Input() value!: string | undefined;
  @Input() label!: string;

  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('dxTextBoxViewChild') dxTextBoxViewChild: DxTextBoxComponent | undefined;



}
