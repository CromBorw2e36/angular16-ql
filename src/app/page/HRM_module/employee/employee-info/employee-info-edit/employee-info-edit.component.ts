import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { PopupComponent } from 'src/app/components/js-devextreme/popup/popup.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { HRM_Employee_Model, HRMEmployeeClient } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-employee-info-edit',
  templateUrl: './employee-info-edit.component.html',
  styleUrls: ['./employee-info-edit.component.scss']
})
export class EmployeeInfoEditComponent  extends LayoutComponentBase {

  constructor(
    injector: Injector,
    private hRMEmployeeClient: HRMEmployeeClient,
  ) {
    super(injector);
    this.titlePopUp = this.translate(this.getMenuSelected().nameVN ?? '', this.getMenuSelected().name ?? '')
  }

  titlePopUp: string;
  listDialogAction: Action_Type_Enum[] = [Action_Type_Enum.SAVE, Action_Type_Enum.CLOSE]
  typeAction?: Action_Type_Enum | undefined;
  InputMaster: HRM_Employee_Model = new HRM_Employee_Model();

  @Input() filterInput: HRM_Employee_Model | undefined = undefined

  @Output() onEditSuccess: EventEmitter<{ code: Action_Type_Enum, data: HRM_Employee_Model }> = new EventEmitter();

  @ViewChild('popupComponent') popupComponent: PopupComponent | undefined;


  setShowPopup(ev: { state: boolean, data: any, typeAction?: Action_Type_Enum }): void {
    this.typeAction = ev.typeAction;
    switch (ev.typeAction) {
      case Action_Type_Enum.ADD: {
        this.InputMaster = new HRM_Employee_Model();
        // this.InputMaster.codeCompany = this._userInfo.codeCompany;
        this.InputMaster.create_at = new Date();
        this.InputMaster.create_by = this._userInfo.name;
        break;
      }
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.VIEW: {
        this._loading = true;
        this.hRMEmployeeClient.get(new HRM_Employee_Model({
          id: ev.data?.id,
          codeCompany: ev.data.company_code
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
        this.InputMaster.codeCompany = ev.data.codeCompany;
        this.InputMaster.create_at = new Date();
        this.InputMaster.create_by = this._userInfo.name;
        this.InputMaster.delete_at = undefined;
        this.InputMaster.delete_by = undefined;
        this.InputMaster.update_at = undefined;
        this.InputMaster.update_by = undefined;
        this.InputMaster.is_delete = false;
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
        this.InputMaster = new HRM_Employee_Model();
        if (this.popupComponent) this.popupComponent.setShow(false);
        break;
      }
    }
  }

  UpdateInputMaster() {
    this._loading = true;
    this.hRMEmployeeClient.update(this.InputMaster).subscribe(res => {
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
    this.InputMaster.is_delete = false;
    this.hRMEmployeeClient.insert(this.InputMaster).subscribe(res => {
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
