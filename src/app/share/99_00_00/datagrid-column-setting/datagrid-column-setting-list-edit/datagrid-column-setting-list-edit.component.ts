import { Component, EventEmitter, Injector, Output, ViewChild } from '@angular/core';
import { Action_Type_Enum, IPopupComponent } from 'src/app/components/js-devextreme/popup/enum_action';
import { PopupComponent } from 'src/app/components/js-devextreme/popup/popup.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { CommonContronllerClient, QueryCommonModel, SysGenRowTable, SysGenRowTablesClient } from 'src/app/system/server/api_share';
import { DatagridColumnSettingsService } from '../service/datagrid-column-settings.service';
import { HomePageService } from 'src/app/system/page/home-page/service/home-page.service';

@Component({
  selector: 'datagrid-column-setting-list-edit',
  templateUrl: './datagrid-column-setting-list-edit.component.html',
  styleUrls: ['./datagrid-column-setting-list-edit.component.scss']
})
export class DatagridColumnSettingListEditComponent extends LayoutComponentBase implements IPopupComponent {


  constructor(
    injector: Injector,
    private dataGirdColumnSettingsService: DatagridColumnSettingsService,
    private sysGenRowTablesClient: SysGenRowTablesClient,
    private homePageService: HomePageService,
    private commonClient: CommonContronllerClient
  ) {
    super(injector)
    this.titlePopUp = this.translate(this.getMenuSelected().nameVN ?? '', this.getMenuSelected().name ?? '')
    this.setShowPopup.bind(this);
  }

  titlePopUp: string;
  InputMaster: SysGenRowTable = new SysGenRowTable();
  listDialogAction: Action_Type_Enum[] = [Action_Type_Enum.SAVE, Action_Type_Enum.CLOSE]
  typeAction?: Action_Type_Enum | undefined;

  @Output() uploadDataSource: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('popupComponent') popupComponent: PopupComponent | undefined;

  setShowPopup(ev: { state: boolean, data: any, typeAction?: Action_Type_Enum }): void {
    this.typeAction = ev.typeAction;
    if (this.popupComponent) this.popupComponent.setShow(ev.state);
    if (ev.state) {
      this.getDataSourceSelectBox();
      switch (this.typeAction) {
        case Action_Type_Enum.ADD: {
          this.InputMaster = new SysGenRowTable();
          this.InputMaster.allowEditing = false;
          this.InputMaster.allowFiltering = true;
          this.InputMaster.allowFixing = false;
          this.InputMaster.allowGrouping = false;
          this.InputMaster.allowHeaderFiltering = true;
          this.InputMaster.allowHiding = false;
          this.InputMaster.allowSearch = true;
          this.InputMaster.allowSorting = true;
          this.InputMaster.autoExpandGroup = false;
          this.InputMaster.create_date = new Date();
          this.InputMaster.update_date = new Date();
          this.InputMaster.companyCode = this.getUserInfo().codeCompany;
          this.InputMaster.width = 200;
          this.InputMaster.visible = true;
          this.InputMaster.minWidth = 100;
          this.InputMaster.alignment = "left";
          this.InputMaster.dataType = "string";
          this.InputMaster.table_name = JSON.parse(sessionStorage.getItem('needTableInsertTableName') ?? "");
          this.InputMaster.orderNo = JSON.parse(sessionStorage.getItem('needTableInsertOrderNo') ?? "0") + 5;
          break;
        }
        case Action_Type_Enum.COPY:
        case Action_Type_Enum.EDIT:
        case Action_Type_Enum.VIEW: {
          this.homePageService.setLoading(true);
          const currentValue = ev.data as SysGenRowTable;
          this.sysGenRowTablesClient.genRowTableSearch(currentValue).subscribe(res => {
            if (res.status == 0 && res.data) {
              const findData = res.data.find(x => x.id == currentValue.id);
              if (findData) {
                this.InputMaster = findData;
                switch (this.typeAction) {
                  case Action_Type_Enum.COPY: {
                    this.InputMaster.id = undefined;
                    this.InputMaster.dataField = undefined;
                    this.InputMaster.caption = undefined;
                    this.InputMaster.caption_VN = undefined;
                    this.InputMaster.orderNo = (this.InputMaster.orderNo ?? 0) + 5;
                    break;
                  }
                }
              }
            } else {
              this.showMessageError(res.msg);
            }
            this.homePageService.setLoading(false);

          }, err => {
            if (err.status == 401 || err.status == 403) this.Authorization();
            this.homePageService.setLoading(false);
          })
          break;
        }
        default: {
          this.InputMaster = new SysGenRowTable();
          break;
        }
      }
    } else {
      this.InputMaster = new SysGenRowTable();
    }
  }

  onActionClick_PopupComponent(ev: { code: string; }): void {
    console.log("Giá trị master: ", this.InputMaster);
    switch (ev.code) {
      case Action_Type_Enum.CLOSE: {
        this.setShowPopup({ state: false, data: undefined });
        break;
      }
      case Action_Type_Enum.SAVE: {
        switch (this.typeAction) {
          case Action_Type_Enum.COPY:
          case Action_Type_Enum.ADD: {
            this.addInputMaster(this.InputMaster);
            break;
          }
          case Action_Type_Enum.VIEW: {

            break;
          }

          case Action_Type_Enum.EDIT: {
            this.updateInputMaster(this.InputMaster);
            break;
          }
        }
        break;
      }
    }
  }

  getColumnNameByCode(code: string) {
    try {
      const dataColumn = this.dataGirdColumnSettingsService.getColumnByCode(code);
      if (dataColumn) {
        return this.translate(dataColumn.nameVN, dataColumn.name);
      }
      else {
        return code;
      }
    } catch {
      return "";
    }
  }

  getDataSourceByKey(code: string) {
    switch (code) {
      case 'alignment':
        {
          return this.dataGirdColumnSettingsService.dataSourceAlignment;
        }
      case 'format': {
        return this.dataGirdColumnSettingsService.dataSourceFormat;
      }
      case 'dataType': {
        return this.dataGirdColumnSettingsService.dataSourceDataType;
      }
      case 'type': {
        return this.dataGirdColumnSettingsService.dataSourceTypeDateBox;
      }
      case 'displayFormat': {
        return this.dataGirdColumnSettingsService.dataSourceDisplayFormat;
      }
      default:
        return []
    }
  }

  addInputMaster(p: SysGenRowTable): void {
    if (!p.table_name || p.table_name.length == 0) {
      this.showMessageError(this.translate('Mã bảng không được để trống', 'The table name cant be empty'));
      return;
    } else if (!p.dataField || p.dataField.length == 0) {
      this.showMessageError(this.translate('Trường dữ liệu không được để trống', 'Data field cant be empty'));
      return;
    } else if (!p.dataType || p.dataType.length == 0) {
      this.showMessageError(this.translate('Kiểu dữ liệu không được để trống', 'Data type cant be empty'));
      return;
    } else if (!p.width || p.width <= 0) {
      this.showMessageError(this.translate('Chiều rộng không hợp lệ', 'Width is invalid'));
      return;
    } else if (!p.minWidth || p.minWidth <= 0) {
      this.showMessageError(this.translate('Chiều rộng tối thiểu không hợp lệ', 'Min width is invalid'));
      return;
    } else if (!p.alignment || p.alignment.length == 0) {
      this.showMessageError(this.translate('Căn chỉnh không hợp lệ', 'Alignment is invalid'));
      return;
    }

    this.sysGenRowTablesClient.genRowTableInsert(p).subscribe(res => {
      if (res.status == 0) {
        this.showMessageSuccess(res.msg);
        this.uploadDataSource.emit();
        this.setShowPopup({ state: false, data: res.data, typeAction: Action_Type_Enum.EDIT });
        sessionStorage.removeItem('needTableInsertTableName');
        sessionStorage.setItem('needTableInsertTableName', JSON.stringify(res.data?.table_name));

        sessionStorage.removeItem('needTableInsertOrderNo');
        sessionStorage.setItem('needTableInsertOrderNo', JSON.stringify(res.data?.orderNo ?? 0));
      } else {
        this.showMessageError(res.msg);
      }
    }, err => {
      if (err.status == 401 || err.status == 403) this.Authorization();
    }
    )
  }

  updateInputMaster(p: SysGenRowTable): void {
    // check invalid data
    if (!p.table_name || p.table_name.length == 0) {
      this.showMessageError(this.translate('Mã bảng không được để trống', 'The table name cant be empty'));
      return;
    } else if (!p.dataField || p.dataField.length == 0) {
      this.showMessageError(this.translate('Trường dữ liệu không được để trống', 'Data field cant be empty'));
      return;
    } else if (!p.dataType || p.dataType.length == 0) {
      this.showMessageError(this.translate('Kiểu dữ liệu không được để trống', 'Data type cant be empty'));
      return;
    } else if (!p.width || p.width <= 0) {
      this.showMessageError(this.translate('Chiều rộng không hợp lệ', 'Width is invalid'));
      return;
    } else if (!p.minWidth || p.minWidth <= 0) {
      this.showMessageError(this.translate('Chiều rộng tối thiểu không hợp lệ', 'Min width is invalid'));
      return;
    } else if (!p.alignment || p.alignment.length == 0) {
      this.showMessageError(this.translate('Căn chỉnh không hợp lệ', 'Alignment is invalid'));
      return;
    }

    this.sysGenRowTablesClient.genRowTableUpdate(p).subscribe(res => {
      if (res.status == 0) {
        this.showMessageSuccess(res.msg);
        this.uploadDataSource.emit();
        this.setShowPopup({ state: false, data: undefined, typeAction: Action_Type_Enum.VIEW });
      } else {
        this.showMessageError(res.msg);
      }
    }, err => {
      if (err.status == 401 || err.status == 403) this.Authorization();
    }
    )
  }

  string_query_data_source_table_name: string = "select * from CategoryCommon where group_id like '99.21.01_TableName'";
  data_source_table_name: any = [];

  getDataSourceSelectBox() {
    if (this.data_source_table_name.length != 0) return;
    const obj = {
      string_query: this.string_query_data_source_table_name,
    } as QueryCommonModel
    this.commonClient.excuteQueryString(obj).subscribe(res => {
      this.data_source_table_name = res;
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

}
