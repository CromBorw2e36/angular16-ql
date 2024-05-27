import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Properties } from 'devextreme/ui/data_grid';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Account, AccountsClient, UserInfo, UserInfoGetListModel } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-role-menu-list',
  templateUrl: './role-menu-list.component.html',
  styleUrls: ['./role-menu-list.component.scss']
})
export class RoleMenuListComponent extends LayoutComponentBase implements OnInit, IDataGridComponent, IToolBarComponent {

  constructor(
    injector: Injector,
    private accountsClient: AccountsClient,
  ) {
    super(injector);

    this.propertyDataGrid = {
      keyExpr: 'id',
      height: window.innerHeight - 46,
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
  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '1'

  propertyDataGrid: Properties;
  value: string = '';
  InputMaster: Array<UserInfoGetListModel> = [];

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;

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
    }
  }


  onLoadData() {
    this.accountsClient.accountGetALL(new Account()).subscribe(res => {
      if (res.status == 0) {
        this.InputMaster = res.data!;
      } else {
        this.showMessageError(res.msg!)
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    });
  }

}

