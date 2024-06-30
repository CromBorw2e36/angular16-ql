import { Location } from '@angular/common';
import { Component, Injector, Input, OnInit, ViewChild } from '@angular/core';
import { FileUploaderComponent, I_Data_Source_File_Model, I_Properties_Model } from 'src/app/components/editor/file-uploader/file-uploader.component';
import { IVoucher_Form_UI, VoucherFormComponent } from 'src/app/components/form/voucher-form/voucher-form/voucher-form.component';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { MovieClient, MovieModel, StatusMessageOfListOfUploadFileModel, UploadFileModel } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.scss']
})
export class MovieEditComponent extends LayoutComponentBase implements OnInit, IVoucher_Form_UI, IToolBarComponent {

  constructor(
    injector: Injector,
    private movieClient: MovieClient,
    private location: Location
  ) {
    super(injector);

    this.fileUploadProperties = {
      multiple: false,
      accept: 'video/*',
      disabled: false,
    }

    this.InsertData.bind(this);
    this.UpdateData.bind(this);
  }


  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '2';
  InputMaster: MovieModel = new MovieModel();
  action_type: Action_Type_Enum | undefined
  fileUploadProperties: I_Properties_Model;


  @Input() dataFilter: MovieModel = new MovieModel();

  @ViewChild('voucherFormComponent') voucherFormComponent: VoucherFormComponent | undefined;
  @ViewChild('uploadFileComponent_trailer') uploadFileComponent_trailer: FileUploaderComponent | undefined;
  @ViewChild('uploadFileComponent_videoUpload') uploadFileComponent_videoUpload: FileUploaderComponent | undefined;

  ngOnInit(): void {
    const state = this.getRouterState<MovieModel>();
    //console.log(state)

    if (state) {
      this.action_type = state?.action_type;
      switch (this.action_type) {
        case Action_Type_Enum.ADD: {
          this.onInitActionAdd();
          break;
        }
        case Action_Type_Enum.COPY:
        case Action_Type_Enum.EDIT:
        case Action_Type_Enum.VIEW: {
          this.onLoadData(state.data);
          break;
        }
        default: {
          break;
        }
      }
    }
  }

  onInitActionAdd() {
    this.InputMaster = new MovieModel();
  }



  ValueChangedEventVoucherForm(event: any): void {

  }

  onLoadData(model: MovieModel) {
    this.movieClient.get(model).subscribe(res => {
      if (res.status == 0) {
        this.InputMaster = res.data!;
        if (this.InputMaster.thumbnail_url) this.getFileImage(this.InputMaster.thumbnail_url, this.InputMaster, 'thumbnail_url');
        if (this.InputMaster.trailer_url && this.uploadFileComponent_trailer) this.uploadFileComponent_trailer.onLoadDataSource([this.InputMaster.trailer_url]);
        if (this.InputMaster.movie_url && this.uploadFileComponent_videoUpload) this.uploadFileComponent_videoUpload.onLoadDataSource([this.InputMaster.movie_url]);
      } else {
        this.showMessageError(res.msg!);
      }
    }, err => {
      if (err.status == 401 || err.status == 403) this.setLogin(false);
      else if (err.status == 500) this.showMessageError(err.msg);
    })
  }


  handleActionClick(ev: I_ToolbarComponent_ActionClick): void {
    switch (ev.code) {
      case Action_Type_Enum.SAVE: {
        switch (this.action_type) {
          case Action_Type_Enum.ADD:
          case Action_Type_Enum.COPY: {
            this.InsertData();
            break;
          }
          case Action_Type_Enum.EDIT: {
            this.UpdateData();
            break;
          }
        }
        break;
      }
    }
  }

  async UpdateData() {
    const uploadParams_trailer: UploadFileModel = {
      table_name: this.tableNameSQL,
      col_name: "trailer_url",
    } as UploadFileModel;

    const uploadParams_move: UploadFileModel = {
      table_name: this.tableNameSQL,
      col_name: "movie_url",
    } as UploadFileModel;

    if (this.uploadFileComponent_trailer && this.uploadFileComponent_trailer.isEdit) {
      this.InputMaster.trailer_url = "";
      const res = await this.uploadFileComponent_trailer.UploadFileVersion12(uploadParams_trailer);
      if (res && res.status == 200) {
        const data: StatusMessageOfListOfUploadFileModel = await res.json();
        this.InputMaster.trailer_url = data.data![0].id as string;// Vì ở đây chỉ cho upload 1 file duy nhất
      }
    }

    if (this.uploadFileComponent_videoUpload && this.uploadFileComponent_videoUpload.isEdit) {
      this.InputMaster.movie_url = "";
      const res = await this.uploadFileComponent_videoUpload.UploadFileVersion12(uploadParams_move);
      if (res && res.status == 200) {
        const data: StatusMessageOfListOfUploadFileModel = await res.json();
        this.InputMaster.movie_url = data.data![0].id as string;// Vì ở đây chỉ cho upload 1 file duy nhất
      }
    }

    this.movieClient.update(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.showMessageInfo(res.msg!);
        this.location.back();
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.Authorization();
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

  async InsertData() {
    const uploadParams_trailer: UploadFileModel = {
      table_name: this.tableNameSQL,
      col_name: "trailer_url",
    } as UploadFileModel;

    const uploadParams_move: UploadFileModel = {
      table_name: this.tableNameSQL,
      col_name: "movie_url",
    } as UploadFileModel;

    if (this.uploadFileComponent_trailer && this.uploadFileComponent_trailer.isEdit) {
      const res = await this.uploadFileComponent_trailer.UploadFileVersion12(uploadParams_trailer);
      if (res && res.status == 200) {
        res.json().then((data: StatusMessageOfListOfUploadFileModel) => {
          this.InputMaster.trailer_url = data.data![0].id as string;// Vì ở đây chỉ cho upload 1 file duy nhất
        }
        )
      }
    }

    if (this.uploadFileComponent_videoUpload && this.uploadFileComponent_videoUpload.isEdit) {
      const res = await this.uploadFileComponent_videoUpload.UploadFileVersion12(uploadParams_move);
      if (res &&  res.status == 200) {
        res.json().then((data: StatusMessageOfListOfUploadFileModel) => {
          this.InputMaster.movie_url = data.data![0].id as string; // Vì ở đây chỉ cho upload 1 file duy nhất
        }
        )
      }
    }

    this.movieClient.insert(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.location.back();
        this.showMessageSuccess(res.msg!);
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.Authorization();
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }


  tableNameSQL = "Movie";
  onLoadDataUploadFile() {
    if (this.uploadFileComponent_videoUpload) {
      const uploadParams: UploadFileModel = {
        table_name: this.tableNameSQL,
        col_name: "avatar",
      } as UploadFileModel;

      const result = this.uploadFileComponent_videoUpload.UploadFileVersion12(uploadParams);
      if (result) {
        result.then(res => {
          if (res && res.status == 200) {
            res.json().then((data: StatusMessageOfListOfUploadFileModel) => {
              this.InputMaster.thumbnail_url = data.data![0].id as string;
            }
            )
          }
        });
      }
    }
  }
}

