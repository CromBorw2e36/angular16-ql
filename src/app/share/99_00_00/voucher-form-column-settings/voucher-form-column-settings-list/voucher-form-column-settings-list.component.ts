import { IDataGridComponent } from './../../../../components/js-devextreme/data-grid/data-grid.component';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { Properties } from 'devextreme/ui/data_grid';
import { DataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysVoucherFormClient, SysVoucherFormColumn } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-voucher-form-column-settings-list',
  templateUrl: './voucher-form-column-settings-list.component.html',
  styleUrls: ['./voucher-form-column-settings-list.component.scss']
})
export class VoucherFormColumnSettingsListComponent extends LayoutComponentBase implements OnInit, IDataGridComponent, IToolBarComponent {

  constructor(
    injector: Injector,
    private sysVoucherFormClient: SysVoucherFormClient,
  ) {
    super(injector);

    // this.tableName = '99_00_00_VoucherForm';
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

  // tableName: string;
  propertyDataGrid: Properties;

  value: string = '';
  InputMaster: Array<SysVoucherFormColumn> = [];

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;

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
          this.setRouter('app-voucher-form-column-settings-edit', dataSelected[0], ev.code);
        } else {
          this.setRouter('app-voucher-form-column-settings-edit', null, ev.code);
        }
        break;
      }
      case Action_Type_Enum.DELETE: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();
        if (dataSelected && dataSelected[0]) {
          this.sysVoucherFormClient.voucherFormColumnDelete(dataSelected[0] as SysVoucherFormColumn).subscribe(res => {
            if (res.data) {
              this.onLoadData();
            }
          }, error => {
            if (error.status == 401 || error.status == 403) this.setLogin(false);
            else if (error.status == 500) this.showMessageError(error.msg)
          });
        }

      }
    }
  }


  onLoadData() {
    this.sysVoucherFormClient.voucherFormColumnSearch(new SysVoucherFormColumn()).subscribe(res => {
      if (res.data) {
        this.InputMaster = res.data;
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    });
  }

}
