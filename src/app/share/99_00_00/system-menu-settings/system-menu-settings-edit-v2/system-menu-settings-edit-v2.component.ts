import { SysMenu, SysMenusClient } from 'src/app/system/server/api_share';
import { Component, EventEmitter, Injector, Input, Output, ViewChild } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { PopupComponent } from 'src/app/components/js-devextreme/popup/popup.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-system-menu-settings-edit-v2',
  templateUrl: './system-menu-settings-edit-v2.component.html',
  styleUrls: ['./system-menu-settings-edit-v2.component.scss']
})
export class SystemMenuSettingsEditV2Component extends LayoutComponentBase {

  constructor(
    injector: Injector,
    private sysMenusClient: SysMenusClient,
    private location: Location
  ) {
    super(injector);
    this.titlePopUp = this.translate(this.getMenuSelected().nameVN ?? '', this.getMenuSelected().name ?? '')
  }

  titlePopUp: string;
  listDialogAction: Action_Type_Enum[] = [Action_Type_Enum.SAVE, Action_Type_Enum.CLOSE]
  typeAction?: Action_Type_Enum | undefined;
  InputMaster: SysMenu = new SysMenu();

  @Input() filterInput: SysMenu | undefined = undefined

  @Output() onEditSuccess: EventEmitter<{ code: Action_Type_Enum, data: SysMenu }> = new EventEmitter();

  @ViewChild('popupComponent') popupComponent: PopupComponent | undefined;


  setShowPopup(ev: { state: boolean, data: any, typeAction?: Action_Type_Enum }): void {
    this.typeAction = ev.typeAction;
    switch (this.typeAction) {
      case Action_Type_Enum.ADD: {
        this.onInitActionAdd();
        break;
      }
      case Action_Type_Enum.COPY:
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.VIEW: {
        this.onLoadData(ev.data);
        break;
      }
      default: {
        break;
      }
    }
    if (this.popupComponent) this.popupComponent.setShow(ev.state);
  }

  onActionClick_PopupComponent(ev: { code: string; }): void {
    switch (ev.code) {
      case Action_Type_Enum.SAVE: {
        switch (this.typeAction) {
          case Action_Type_Enum.ADD:
          case Action_Type_Enum.COPY: {
            this.InsertInputMaster();
            break;
          }
          case Action_Type_Enum.EDIT: {
            this.UpdateInputMaster();
            break;
          }
        }
        break;
        break;
      }
      case Action_Type_Enum.CLOSE: {
        this.InputMaster = new SysMenu();
        if (this.popupComponent) this.popupComponent.setShow(false);
        break;
      }
    }
  }

  onInitActionAdd() {
    this.InputMaster = new SysMenu();
  }

  onLoadData(model: SysMenu) {
    this.sysMenusClient.sysMenuSearch(model).subscribe(res => {
      if (res.status == 0) {
        if (res.data && res.data.length > 0) {
          this.InputMaster = res.data[0]!;
        }
        else
          this.showMessageInfo(res.msg!);
      } else {
        this.showMessageError(res.msg!);
      }
    }, err => {
      if (err.status == 401 || err.status == 403) this.setLogin(false);
      else if (err.status == 500) this.showMessageError(err.msg);
    })
  }

  UpdateInputMaster() {
    this._loading = true;
    this.sysMenusClient.sysMenuUpdate(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.showMessageInfo(res.msg!);
        this.onEditSuccess.emit({ code: this.typeAction!, data: res.data! });
        this.onActionClick_PopupComponent({ code: Action_Type_Enum.CLOSE })
      } else {
        this.showMessageError(res.msg!);
      }
      this._loading = false;
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
      this._loading = false;
    })
  }

  InsertInputMaster() {
    this._loading = true;
    this.sysMenusClient.sysMenuInsert(this.InputMaster).subscribe(res => {
      if (res.status == 0) {
        this.showMessageSuccess(res.msg!);
        this.onEditSuccess.emit({ code: this.typeAction!, data: res.data! });
        this.onActionClick_PopupComponent({ code: Action_Type_Enum.CLOSE })
      } else {
        this.showMessageError(res.msg!);
      }
      this._loading = false;
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
        this._loading = false;
    })
  }
}
