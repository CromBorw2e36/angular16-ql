import { Component, ElementRef, EventEmitter, HostListener, Injector, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { APIBase } from 'src/app/system/server/APIBase';
import { API_BASE_URL, CommonContronllerClient, UploadFileModel } from 'src/app/system/server/api_share';

export interface I_Data_Source_File_Model {
  id?: string;
  file?: File;
  url?: string;
  name?: string;
}

export interface I_EventValueChange {
  data: I_Data_Source_File_Model[];
  value: I_Data_Source_File_Model | I_Data_Source_File_Model[];
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

  constructor(
    injector: Injector,
    private commonClient: CommonContronllerClient
  ) {
    super(injector)

    this.property = {
      multiple: true,
      accept: '*',
      disabled: false,
    }
    this.apiBase = new APIBase(injector);
  }


  nameTag: string = `input_file${this.random_key_string(10)}`;
  apiBase: APIBase;
  InputMaster: Array<I_Data_Source_File_Model> = [];
  isEdit: boolean = false;

  @Input() disabled: boolean = false;
  @Input() property: I_Properties_Model = {}
  @Input() label: string | undefined = this.translate("Tải tập tin ở đây !", "Here you can upload files here!");

  @Output() onValueChange = new EventEmitter();

  @ViewChild('inputTypeFile') inputTypeFile: ElementRef<HTMLInputElement> | undefined;


  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes) {
      this.disabled = changes['disabled'].currentValue;
      this.property.disabled = changes['disabled'].currentValue;
    }
  }


  protected handleUploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      //console.log('Files selected:', input.files);
      const files: File[] = Array.from(input.files || []);
      this.EventInsertFile(files);
    }
  }

  protected handleDropFile(event: DragEvent) {
    event.preventDefault();
    const files: File[] = Array.from(event.dataTransfer?.files || []);
    if (files) {
      //console.log('Files dropped:', files);
      this.EventInsertFile(files);
    }
  }

  protected handleDragFile(event: DragEvent) {
    event.preventDefault();
    // Optionally handle any drag-specific logic here
  }

  protected handleDragOver(event: DragEvent) {
    event.preventDefault();
    // Optionally handle any drag-specific logic here
  }

  @HostListener('paste', ['$event'])
  protected onPaste(event: ClipboardEvent) {
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

  protected handlePasteFile(file: Array<File>) {
    //console.log('Handling pasted file:', file);
    this.EventInsertFile(file);
  }

  private EventInsertFile(files: Array<File>) {
    const arr: I_Data_Source_File_Model[] = [];

    files.forEach(file => {
      const obj = {
        id: this.random_key_string(10),
        file: file,
        url: ''
      }
      const visit = this.InputMaster.length;
      this.InputMaster.push(obj);
      this.readFile(file, visit);
      arr.push(this.InputMaster[visit]);
    })

    this.onValueChange.emit({
      data: this.InputMaster,
      value: arr,
    } as I_EventValueChange);
    this.isEdit = true;
  }

  public readFile(file: File, visit: number) {
    const fileURL = URL.createObjectURL(file);
    this.InputMaster[visit].url = fileURL;
    this.InputMaster[visit].name = file.name;
    // this.InputMaster[visit].size = file.name;
  }

  public _refresh() { // Refresh tag input file
    if (this.inputTypeFile) {
      this.inputTypeFile.nativeElement.value = '';
    }
  }

  public handleSave() {
    // console.log(this.InputMaster)
  }

  protected handleRemoveItemByIndex(index: number) {
    this.InputMaster.splice(index, 1);
    this.isEdit = true;
  }

  public getValue() {
    return this.InputMaster;
  }


  private handleGetUploadFileParam(p: UploadFileModel): FormData {
    const formData = new FormData();
    this.InputMaster.forEach(x => {
      if (x.file) formData.append('files', x.file as File); // fileModel.file type file
    })
    formData.append('table_name', p.table_name ? p.table_name : '');
    formData.append('col_name', p.col_name ? p.col_name : '');
    return formData;
  }

  public UploadFileVersion12(uploadParams: UploadFileModel) {
    if (this.InputMaster.length == 0) return Promise.resolve(undefined);
    const formDataArray = this.handleGetUploadFileParam(uploadParams);
    let url_ = this.configService.BASE_URL_SERVER + "/api/CommonContronller/UploadFileVersion12";
    const token = this.cookieService.get('TOKEN');

    return fetch(url_, {
      method: 'POST',
      body: formDataArray,
      headers: {
        'Token': token,
        'Authorization': `${this.apiBase.authToken}`
      }
    })
      .then((x) => Promise.resolve(x));
    // const result = await response.json();
  }

  onLoadDataSource(fileID: Array<string>) {
    this.commonClient.fileSearch2(fileID).subscribe(res => {
      if (res.status == 0) {
        const data: UploadFileModel[] | undefined = res.data;
        if (data) {
          data.forEach(item => {
            const obj = {
              id: item.id,
              name: item.file_name,
              file: undefined,
              url: undefined,
            } as I_Data_Source_File_Model;
            this.InputMaster.push(obj);
          });
        }
      }
    }, err => {
      if (err.status == 401 || err.status == 403) this.Authorization();
    })
  }

}
