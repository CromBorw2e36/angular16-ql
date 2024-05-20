import { Component, ElementRef, HostListener, Injector, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

export interface I_Data_Source_File_Model {
  id?: string;
  file?: File;
  url?: string;
  name?: string;
}

export interface I_Properties_Model {
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
}

@Component({
  selector: 'file-uploader-component',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent extends LayoutComponentBase implements OnChanges {

  constructor(injector: Injector) {
    super(injector)

    this.property = {
      multiple: true,
      accept: '*',
      disabled: false,
    }

  }


  nameTag: string = `input_file${this.random_key_string(10)}`;

  @Input() disabled: boolean = false;
  @Input() property: I_Properties_Model = {}
  @Input() label!: string | undefined;

  InputMaster: Array<I_Data_Source_File_Model> = [];

  @ViewChild('inputTypeFile') inputTypeFile: ElementRef<HTMLInputElement> | undefined;


  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      this.disabled = changes['disabled'].currentValue;
      this.property.disabled = changes['disabled'].currentValue;
    }
  }


  handleUploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      // console.log('Files selected:', input.files);
      const files: File[] = Array.from(input.files || []);
      this.EventInsertFile(files);

    }
  }

  handleDropFile(event: DragEvent) {
    event.preventDefault();
    const files: File[] = Array.from(event.dataTransfer?.files || []);
    if (files) {
      // console.log('Files dropped:', files);
      this.EventInsertFile(files);
    }
  }

  handleDragFile(event: DragEvent) {
    event.preventDefault();
    // Optionally handle any drag-specific logic here
  }

  handleDragOver(event: DragEvent) {
    event.preventDefault();
    // Optionally handle any drag-specific logic here
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    const items = event.clipboardData?.items;
    if (items) {
      const arr = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const file = items[i].getAsFile();
          if (file) {
            arr.push(file);
          }
        }
      }
      this.handlePasteFile(arr); // Call the paste file handler
    }
  }

  handlePasteFile(file: Array<File>) {
    // console.log('Handling pasted file:', file);
    this.EventInsertFile(file);
  }

  EventInsertFile(files: Array<File>) {
    files.forEach(file => {
      const visit = this.InputMaster.length;
      this.InputMaster.push({
        id: this.random_key_string(10),
        file: file,
        url: ''
      });
      this.readFile(file, visit);
    })
  }

  readFile(file: File, visit: number) {
    const fileURL = URL.createObjectURL(file);
    this.InputMaster[visit].url = fileURL;
    this.InputMaster[visit].name = file.name;
    // this.InputMaster[visit].size = file.name;
  }

  _refresh() { // Refresh tag input file
    if (this.inputTypeFile) {
      this.inputTypeFile.nativeElement.value = '';
    }
  }

  handleSave() {
    console.log(this.InputMaster)
  }

  handleRemoveItemByIndex(index: number) {
    this.InputMaster.splice(index, 1);
  }

  getValue() {
    return this.InputMaster;
  }
}
