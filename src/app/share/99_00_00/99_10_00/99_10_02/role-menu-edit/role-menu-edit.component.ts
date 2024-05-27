import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Properties } from 'devextreme/ui/data_grid';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Account, AccountsClient, MenuPermissionInsModel, MenuPermissions, MenuPermissionsClient, SysMenu, UserInfo } from 'src/app/system/server/api_share';
import { RoleMenuPopupComponent } from './role-menu-popup/role-menu-popup.component';

@Component({
  selector: 'app-role-menu-edit',
  templateUrl: './role-menu-edit.component.html',
  styleUrls: ['./role-menu-edit.component.scss']
})
export class RoleMenuEditComponent extends LayoutComponentBase implements OnInit, IDataGridComponent, IToolBarComponent {

  constructor(
    injector: Injector,
    private accountsClient: AccountsClient,
    private menuPermissionClient: MenuPermissionsClient,
  ) {
    super(injector);

    this.propertyDataGrid = {
      keyExpr: 'menuid',
      height: '64vh',
      width: '100%',
      columnAutoWidth: true,
      scrolling: {
        mode: 'virtual'
      },
      pager: {
        displayMode: 'adaptive',
        showNavigationButtons: true,
        showPageSizeSelector: true,
        visible: true,
      },
      selection: {
        mode: 'multiple',
        selectAllMode: 'page',
        allowSelectAll: true,
        showCheckBoxesMode: 'onClick'
      }
    }
  }
  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '2'

  propertyDataGrid: Properties;
  value: string = '';

  InputMaster_DataGrid: Array<SysMenu> = []
  InputMaster_VoucherFormEdit: Account = new Account();


  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;
  @ViewChild('roleMenuPopup') roleMenuPopup: RoleMenuPopupComponent | undefined;

  ngOnInit(): void {
    this.onLoadData();
  }


  handleActionClick(ev: I_ToolbarComponent_ActionClick) {
    switch (ev.code) {
      case Action_Type_Enum.VIEW:
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.PERMISSION:
        {
          const dataSelected = this.dataGridComponent?.getRowSelectedData();
          if (dataSelected && dataSelected[0]) {
            this.setRouter(this._urlVoucherFormEdit, dataSelected[0], ev.code);
          } else {
            this.showMessageError(this.translate('Vui lòng chọn ít nhất 1 dòng để thực hiện', 'Please select at least 1 row to execute'));
          }
          break;
        }
      case Action_Type_Enum.ADD: {
        if (this.roleMenuPopup) {
          this.roleMenuPopup.setShowPopup({
            state: true,
            data: undefined,
            typeAction: ev.code,
          })
        }
        break;
      }
      case Action_Type_Enum.SAVE: {
        this.InsertMenu();
        break;
      }
      case Action_Type_Enum.DELETE: {
        if (this.dataGridComponent) {
          const rowSelect = this.dataGridComponent.getRowSelectedKeys();
          if (rowSelect.length > 0) {
            rowSelect.map((x, i) => {
              const idx = this.InputMaster_DataGrid.findIndex(x => x.menuid == rowSelect[i]);
              if (idx != -1) {
                this.InputMaster_DataGrid.splice(idx, 1);
              }
            })
          } else {
            this.showMessageError(this.translate("Vui lòng chọn ít nhất 1 dòng để thực hiện", "Please select at least 1 row to execute"));
          }
        }
        break;

      }
    }
  }


  onLoadData() {
    const state = this.getRouterState<UserInfo>()
    console.log(state)
    const obj = {
      account: {
        account: state?.data.id,
        companyCode: state?.data.codeCompany,
      },
    } as MenuPermissionInsModel;

    this.menuPermissionClient.roleMenuSearch(obj).subscribe(res => {
      if (res.status == 0) {
        this.InputMaster_DataGrid = res.data!.list_menu!;
        this.InputMaster_VoucherFormEdit = res.data!.account!;
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    });
  }

  InsertListMenu(ev: Array<SysMenu>) {
    ev.map(x => {
      const checkExists = this.InputMaster_DataGrid.findIndex(y => y.menuid == x.menuid);
      if (checkExists == -1) {
        this.InputMaster_DataGrid.push(x);
      }
    })
  }

  InsertMenu() {
    const obj = {
      account: this.InputMaster_VoucherFormEdit,
      list_permission: this.InputMaster_DataGrid,
    } as MenuPermissionInsModel
    this.menuPermissionClient.roleMenuInsert(obj).subscribe(res => {
      if (res.status == 0) {
        this.showMessageSuccess(res.msg!);
        this.onLoadData();
      } else {
        this.showMessageError(res.msg!);
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

}


