import { Component, Injector, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FileUploaderComponent, I_Data_Source_File_Model, I_EventValueChange, I_Properties_Model } from '../file-uploader/file-uploader.component';
import { UploadFileModel } from 'src/app/system/server/api_share';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';

@Component({
  selector: 'component-avatar-image',
  templateUrl: './avatar-image.component.html',
  styleUrls: ['./avatar-image.component.scss']
})
export class AvatarImageComponent extends LayoutComponentBase implements OnChanges {


  constructor(injector: Injector) {
    super(injector);
    this.propertyUploadFile = {
      multiple: false,
      accept: 'image/*',
      disabled: false,
    }
    this.InputMaster = '../../../../assets/image/load-image-error.jpg';
  }


  nameTag: string = "";
  propertyUploadFile: I_Properties_Model

  isEdit: boolean = false; // khi người dùng chỉnh sửa thì sẽ kích hoạt

  @Input() InputMaster: string | any | undefined;

  @ViewChild('uploadFile') uploadFile: FileUploaderComponent | undefined;


  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if ('InputMaster' in changes) {
      this.InputMaster = changes['InputMaster'].currentValue;
      this.isEdit = false;



      this.getFile(this.InputMaster).then(
        blob => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            // console.log(url)
            this.InputMaster = url; // Set the URL to the imageUrl property
          }
        },
        error => {
          if(error.status == 401 || error.status == 403) this.Authorization();
        }
      );
      // this.getFile(this.InputMaster).then(x => {
      //   this.InputMaster = x;
      // })
    }
  }

  ngAfterViewInit(): void {
    if (this.uploadFile) {
      this.nameTag = this.uploadFile.nameTag;
    }
  }


  handleValueChange(event: I_EventValueChange) {
    const value = (event.value as I_Data_Source_File_Model[])[0];
    this.InputMaster = value.url;
    this.isEdit = true;
  }

  handleGetInputMaster(uploadParams: UploadFileModel) {
    if (this.uploadFile) {
      return this.uploadFile.UploadFileVersion12(uploadParams);
    } else {
      return undefined;
    }
  }

  eventErrorLoading(ev: any) {
    ev.target.src = '../../../../assets/image/load-image-error.jpg';
  }

}
