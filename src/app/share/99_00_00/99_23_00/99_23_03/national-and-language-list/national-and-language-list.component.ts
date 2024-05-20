import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Properties } from 'devextreme/ui/data_grid';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { CategoryCommonClient, National } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-national-and-language-list',
  templateUrl: './national-and-language-list.component.html',
  styleUrls: ['./national-and-language-list.component.scss']
})
export class NationalAndLanguageListComponent extends LayoutComponentBase implements OnInit, IDataGridComponent, IToolBarComponent {

  constructor(
    injector: Injector,
    private categoryCommonClient: CategoryCommonClient,
  ) {
    super(injector);

    this.propertyDataGrid = {
      keyExpr: 'code',
      height: window.innerHeight - 46,
      width: '100%',
      columnAutoWidth: true,
      scrolling: {
        mode: 'virtual'
      },
      pager: {
        allowedPageSizes: [10, 20, 50, 100],
        displayMode: 'full'
      },
      selection: {
        mode: 'multiple',
        selectAllMode: 'allPages'
      }
    }
  }
  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '1'

  propertyDataGrid: Properties;
  value: string = '';
  InputMaster: Array<any> = [];

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;

  ngOnInit(): void {
    this.onLoadData();
  }

  handleActionClick(ev: I_ToolbarComponent_ActionClick) {
    switch (ev.code) {
      case Action_Type_Enum.ADD: {
        this.setRouter(this._urlVoucherFormEdit, null, ev.code);
        break;
      }
      case Action_Type_Enum.VIEW:
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.COPY: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();
        if (dataSelected && dataSelected[0]) {
          this.setRouter(this._urlVoucherFormEdit, dataSelected[0], ev.code);
        } else {
          this.showMessageError(this.translate('Không có dữ liệu được chọn', 'Please select a row to edit'));
        }
        break;
      }
      case Action_Type_Enum.DELETE: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();
        if (dataSelected && dataSelected[0]) {
          this.categoryCommonClient.nationalLanguageDelete(dataSelected[0] as National).subscribe(res => {
            if (res.status == 0) {
              this.onLoadData();
              this.showMessageSuccess(res.msg!)
            }
            this.showMessageError(res.msg!)
          }, error => {
            if (error.status == 401 || error.status == 403) this.setLogin(false);
            else if (error.status == 500) this.showMessageError(error.msg)
          });
        } else {
          this.showMessageError(this.translate('Không có dữ liệu được chọn', 'Please select a row to edit'));
        }
        break;
      }
    }
  }


  onLoadData() {
    this.categoryCommonClient.nationalLanguageSearch(new National()).subscribe(res => {
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

