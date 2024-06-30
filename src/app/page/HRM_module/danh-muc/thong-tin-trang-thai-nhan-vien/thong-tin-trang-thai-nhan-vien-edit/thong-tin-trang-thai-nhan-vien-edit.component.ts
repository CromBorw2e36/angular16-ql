import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { PopupComponent } from 'src/app/components/js-devextreme/popup/popup.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { HRMCommonClient, StatusEmployeeModel } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-thong-tin-trang-thai-nhan-vien-edit',
  templateUrl: './thong-tin-trang-thai-nhan-vien-edit.component.html',
  styleUrls: ['./thong-tin-trang-thai-nhan-vien-edit.component.scss']
})
export class ThongTinTrangThaiNhanVienEditComponent extends LayoutComponentBase {

  constructor(
    injector: Injector,
    private hRMCommonClient: HRMCommonClient,
  ) {
    super(injector);
    this.titlePopUp = this.translate(this.getMenuSelected().nameVN ?? '', this.getMenuSelected().name ?? '')
  }

  titlePopUp: string;
  listDialogAction: Action_Type_Enum[] = [Action_Type_Enum.SAVE, Action_Type_Enum.CLOSE]
  typeAction?: Action_Type_Enum | undefined;
  InputMaster: StatusEmployeeModel = new StatusEmployeeModel();

  @Input() filterInput: StatusEmployeeModel | undefined = undefined

  @Output() onEditSuccess: EventEmitter<{ code: Action_Type_Enum, data: StatusEmployeeModel }> = new EventEmitter();

  @ViewChild('popupComponent') popupComponent: PopupComponent | undefined;


  setShowPopup(ev: { state: boolean, data: any, typeAction?: Action_Type_Enum }): void {
    this.typeAction = ev.typeAction;
    switch (ev.typeAction) {
      case Action_Type_Enum.ADD: {
        this.InputMaster = new StatusEmployeeModel();
        this.InputMaster.company_code = this._userInfo.codeCompany;
        this.InputMaster.created_at = new Date();
        this.InputMaster.created_by = this._userInfo.name;
        break;
      }
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.VIEW: {
        this._loading = true;
        this.hRMCommonClient.statusEmployeenGet(new StatusEmployeeModel({
          id: ev.data?.id,
          company_code: ev.data.company_code
        })).subscribe(res => {
          if (res.status == 0 && res.data) {
            this.InputMaster = res.data;
          } else if (res.status == 1) {
            this.showMessageError(res.msg);
          }
          this._loading = false;
        }, err => {
          if (err.status == 401 || err.status == 403) this.setLogin(false);
        }, () => {
          this._loading = false;
        });
        break;
      }
      case Action_Type_Enum.COPY: {
        this.InputMaster = ev.data;
        this.InputMaster.id = undefined;
        this.InputMaster.company_code = this._userInfo.codeCompany;
        this.InputMaster.created_at = new Date();
        this.InputMaster.created_by = this._userInfo.name;
        this.InputMaster.delete_at = undefined;
        this.InputMaster.delete_by = undefined;
        this.InputMaster.update_at = undefined;
        this.InputMaster.update_by = undefined;
        this.InputMaster.is_delete = false;
        this.InputMaster.is_active = false;
      } break;
    }
    if (this.popupComponent) this.popupComponent.setShow(ev.state);
  }

  onActionClick_PopupComponent(ev: { code: string; }): void {
    switch (ev.code) {
      case Action_Type_Enum.SAVE: {
        switch (this.typeAction) {
          case Action_Type_Enum.ADD: {
            this.InsertInputMaster();
            break;
          }
          case Action_Type_Enum.EDIT: {
            this.UpdateInputMaster();
            break;
          }
        }
        break;
      }
      case Action_Type_Enum.CLOSE: {
        this.InputMaster = new StatusEmployeeModel();
        if (this.popupComponent) this.popupComponent.setShow(false);
        break;
      }
    }
  }

  UpdateInputMaster() {
    this._loading = true;
    this.hRMCommonClient.statusEmployeeUpdate(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.showMessageSuccess(res.msg);
        this.onEditSuccess.emit({ code: Action_Type_Enum.SAVE, data: res.data! });
        this.onActionClick_PopupComponent({ code: Action_Type_Enum.CLOSE })
      } else if (res.status == 1) {
        this.showMessageError(res.msg);
      }
      this._loading = false;
    }, err => {
      if (err.status == 401 || err.status == 403) this.setLogin(false);
      this._loading = false;
    });
  }

  InsertInputMaster() {
    this._loading = true;
    this.InputMaster.is_active = true;
    this.hRMCommonClient.statusEmployeeInsert(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.showMessageSuccess(res.msg);
        this.onEditSuccess.emit({ code: Action_Type_Enum.SAVE, data: res.data! });
        this.onActionClick_PopupComponent({ code: Action_Type_Enum.CLOSE })
      } else if (res.status == 1) {
        this.showMessageError(res.msg);
      }
      this._loading = false;
    }, err => {
      if (err.status == 401 || err.status == 403) this.setLogin(false);
      this._loading = false;
    });
  }
}
