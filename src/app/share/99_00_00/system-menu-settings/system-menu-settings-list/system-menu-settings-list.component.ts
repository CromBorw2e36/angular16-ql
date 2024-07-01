import { SysMenu, SysMenusClient } from './../../../../system/server/api_share';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { Properties } from 'devextreme/ui/data_grid';
import { SystemMenuSettingsEditV2Component } from '../system-menu-settings-edit-v2/system-menu-settings-edit-v2.component';

@Component({
  selector: 'app-system-menu-settings-list',
  templateUrl: './system-menu-settings-list.component.html',
  styleUrls: ['./system-menu-settings-list.component.scss']
})
export class SystemMenuSettingsListComponent extends LayoutComponentBase implements OnInit, IDataGridComponent, IToolBarComponent {

  constructor(
    injector: Injector,
    private sysMenusClient: SysMenusClient,
  ) {
    super(injector);

    this.propertyDataGrid = {
      keyExpr: 'menuid',
      height: window.innerHeight - 50,
      width: '100%',
      columnAutoWidth: true,
      scrolling: {
        mode: 'virtual'
      },
      pager: {
        displayMode: 'full',
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
  InputMaster: Array<SysMenu> = [];
  filterInput: SysMenu = new SysMenu();

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;
  @ViewChild('systemMenuSettingsEditV2Component') systemMenuSettingsEditV2Component: SystemMenuSettingsEditV2Component | undefined;

  ngOnInit(): void {
    this.onLoadData();
  }

  handleActionClick(ev: I_ToolbarComponent_ActionClick) {
    switch (ev.code) {
      case Action_Type_Enum.ADD:
      case Action_Type_Enum.VIEW:
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.COPY: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();
        if (dataSelected && dataSelected[0]) {
          // this.setRouter(this._urlVoucherFormEdit, dataSelected[0], ev.code);
          if (this.systemMenuSettingsEditV2Component) {
            this.systemMenuSettingsEditV2Component.setShowPopup({ state: true, data: dataSelected[0], typeAction: ev.code });
          }
        } else {
          // this.setRouter(this._urlVoucherFormEdit, null, ev.code);
          if (this.systemMenuSettingsEditV2Component) {
            this.systemMenuSettingsEditV2Component.setShowPopup({ state: true, data: null, typeAction: ev.code });
          }
        }
        break;
      }
      case Action_Type_Enum.DELETE: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();

        const confirmDelete = confirm(this.translate('Bạn có chắc chắn muốn xóa?', 'Are you sure to delete?'));
        if (!confirmDelete) break;

        if (dataSelected && dataSelected[0]) {
          this.sysMenusClient.sysMenuDelete(dataSelected[0] as SysMenu).subscribe(res => {
            if (res.status == 0) {
              this.onLoadData();
              this.showMessageSuccess(res.msg!)
            }
            this.showMessageError(res.msg!)
          }, error => {
            if (error.status == 401 || error.status == 403) this.setLogin(false);
            else if (error.status == 500) this.showMessageError(error.msg)
          });
        }

      }
    }
  }


  onLoadData() {
    this.sysMenusClient.sysMenuSearch(new SysMenu()).subscribe(res => {
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

  ActionEditSuccess(event: { code: Action_Type_Enum, data: SysMenu }) {
    const id = event!.data!.menuid!
    this.onLoadData();
    this.dataGridComponent?.dxDataGridComponent?.instance.selectRows([id], true);
  }

}
