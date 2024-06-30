import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import { Properties } from 'devextreme/ui/popup';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { Action_Type_Enum, IPopupComponent } from 'src/app/components/js-devextreme/popup/enum_action';
import { PopupComponent } from 'src/app/components/js-devextreme/popup/popup.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysGenRowTable, SysGenRowTablesClient, SysVoucherFormClient } from 'src/app/system/server/api_share';
import { DatagridColumnSettingListEditComponent } from '../datagrid-column-setting-list-edit/datagrid-column-setting-list-edit.component';
import { I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import { HomePageService } from 'src/app/system/page/home-page/service/home-page.service';

@Component({
  selector: 'app-datagrid-column-setting-list',
  templateUrl: './datagrid-column-setting-list.component.html',
  styleUrls: ['./datagrid-column-setting-list.component.scss']
})
export class DatagridColumnSettingListComponent extends LayoutComponentBase implements OnInit, IDataGridComponent {

  constructor(
    injector: Injector,
    private sysGenRowTableClient: SysGenRowTablesClient,
    private homePageService: HomePageService
  ) {
    super(injector);
    this.propertyDataGrid = {
      keyExpr: 'id',
      height: window.innerHeight - 50,
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

  propertiesPopupComponent?: Properties | undefined;
  listAction?: Action_Type_Enum[] | undefined;


  tableName: string = '99_00_00_SYS_DATA_GRID';
  value: string = '';
  InputMaster: Array<SysGenRowTable> = [];
  propertyDataGrid: DxDataGridTypes.Properties;

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;
  @ViewChild('DatagridColumnSettingListEditComponent') datagridColumnSettingListEditComponent: DatagridColumnSettingListEditComponent | undefined;


  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.sysGenRowTableClient.genRowTableSearch({} as SysGenRowTable).subscribe(res => {
      if (res.data) {
        this.InputMaster = res.data;
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    });
  }

  handleActionClick(ev: I_ToolbarComponent_ActionClick) {
    switch (ev.code) {
      case Action_Type_Enum.ADD: {
        this.datagridColumnSettingListEditComponent?.setShowPopup({ state: true, typeAction: Action_Type_Enum.ADD, data: undefined });
        break;
      }
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.VIEW:
      case Action_Type_Enum.COPY: {
        if (this.dataGridComponent) {
          const rowSelect = this.dataGridComponent.getRowSelectedData<SysGenRowTable>();
          if (rowSelect[0]) {
            this.datagridColumnSettingListEditComponent?.setShowPopup({ state: true, data: rowSelect[0], typeAction: ev.code });
          }
        }
        break;
      }
      case Action_Type_Enum.DELETE: {
        if (this.dataGridComponent) {
          const rowSelect = this.dataGridComponent.getRowSelectedData<SysGenRowTable>();
          if (rowSelect[0]) {
            this.homePageService.setLoading(true);
            this.sysGenRowTableClient.genRowTableDelete(rowSelect[0]).subscribe(x => {
              this.homePageService.setLoading(false);
              if (x.status == 0) {
                this.showMessageSuccess(x.msg);
                this.onLoadData();
              } else {
                this.showMessageError(x.msg);
              }
            }, err => {
              this.homePageService.setLoading(false);
            })
          }
        }
        break;
      }
    }
  }
}
