import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ValueChangedEvent } from 'devextreme/ui/text_box';

@Component({
  selector: 'editor-text-box-devextreme',
  templateUrl: './text-box-devextreme.component.html',
  styleUrls: ['./text-box-devextreme.component.scss']
})
export class TextBoxDevextremeComponent {
  @Input() value?: any = undefined;
  @Input() showClearButton: boolean = false;
  @Input() inputAttr?: any = { 'aria-label': 'Full Name' };
  @Input() mode?: 'text' | 'password' = 'text';
  @Input() placeholder?: string = '';
  @Input() name?: string = 'text';
  @Input() visible?: boolean = false;
  @Output() onValueChanged?: EventEmitter<any> = new EventEmitter<ValueChangedEvent>();

  handleValueChanged(ev:any){
    if(this.onValueChanged) this.onValueChanged.emit(ev);
  }
}
