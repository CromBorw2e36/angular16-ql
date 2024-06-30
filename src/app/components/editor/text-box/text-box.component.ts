import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IInputIconModule } from './editor-interface';

@Component({
  selector: 'editor-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.scss']
})
export class TextBoxComponent {
  constructor() {
  }

  @Input() inputType: 'text' | 'textarea' | 'number' | 'search' | 'password' | 'email' | 'tel' | 'data' | 'time' = 'text';
  @Input() icons?: IInputIconModule[];
  @Output() onChange = new EventEmitter<any>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocusIn = new EventEmitter<FocusEvent>();
  @Output() onFocusOut = new EventEmitter<FocusEvent>();
  @Output() onInvalid = new EventEmitter<any>();
  @Output() onDrop = new EventEmitter<any>();
  @Output() onDrag = new EventEmitter<any>();
  @Output() onKeyPress = new EventEmitter<KeyboardEvent>();
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();
  @Output() onEnter = new EventEmitter<any>();

  get getIconBefore() {
    return this.icons?.filter(x => x.position === 'before');
  }

  get getIconAfter() {
    return this.icons?.filter(x => x.position === 'after');
  }

  trackByFunc(index: number) {
    return index;
  }

  renderClassIcon(className: string | undefined) {
    return className ?? 'input-icon '
  }

  handleChange(ev: Event) {
    //console.log((ev.currentTarget as HTMLInputElement).value)
    this.onChange.emit(ev);
  }

  handleFocus(ev: FocusEvent) {
    this.onFocus.emit(ev);
  }

  handleFocusIn(ev: FocusEvent) {
    this.onFocusIn.emit(ev);
  }

  handleFocusOut(ev: FocusEvent) {
    this.onFocusOut.emit(ev);
  }

  handleBlur(ev: FocusEvent) {
    this.onBlur.emit(ev);
  }
  handleInvalid(ev: any) {
    this.onInvalid.emit(ev);
  }
  handleDrop(ev: any) {
    this.onDrop.emit(ev);
  }
  handleDrag(ev: DragEvent) {
    this.onDrag.emit(ev);
  }
  handleKeypress(ev: KeyboardEvent) {
    this.onKeyPress.emit(ev);
  }
  handleKeyDown(ev: KeyboardEvent) {
    this.onKeyDown.emit(ev);
  }
  handleKeyUp(ev: KeyboardEvent) {
    this.onKeyUp.emit(ev);
  }

  handleKeyEnter(ev: any) {
    this.onEnter.emit(ev);
  }
}
