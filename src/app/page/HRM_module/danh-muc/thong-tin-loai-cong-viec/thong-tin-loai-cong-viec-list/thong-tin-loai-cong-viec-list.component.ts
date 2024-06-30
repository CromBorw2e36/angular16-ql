import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Properties } from 'devextreme/ui/data_grid';
import { DataGridComponent, IDataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import { IToolBarComponent, I_ToolbarComponent_ActionClick } from 'src/app/components/tool-bar/tool-bar.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { HRMCommonClient, TypeEmployeeModel } from 'src/app/system/server/api_share';
import { Action_Type_Enum } from 'src/app/components/js-devextreme/popup/enum_action';
import { ThongTinLoaiCongViecEditComponent } from '../thong-tin-loai-cong-viec-edit/thong-tin-loai-cong-viec-edit.component';

@Component({
  selector: 'app-thong-tin-loai-cong-viec-list',
  templateUrl: './thong-tin-loai-cong-viec-list.component.html',
  styleUrls: ['./thong-tin-loai-cong-viec-list.component.scss']
})
export class ThongTinLoaiCongViecListComponent   extends LayoutComponentBase implements OnInit, IDataGridComponent, IToolBarComponent {

  constructor(
    injector: Injector,
    private hRMCommonClient: HRMCommonClient,
  ) {
    super(injector);

    this.propertyDataGrid = {
      keyExpr: 'id',
      height: window.innerHeight - 50,
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
    } as Properties;
  }
  action_type_toolbar: '1' | '2' | '3' | '4' | '5' | '6' | '7' = '1'

  propertyDataGrid: Properties;
  value: string = '';
  InputMaster: Array<TypeEmployeeModel> = [];
  filterInput: TypeEmployeeModel = {} as TypeEmployeeModel;

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;
  @ViewChild('thongTinLoaiCongViecEditComponent') thongTinLoaiCongViecEditComponent: ThongTinLoaiCongViecEditComponent | undefined;


  ngOnInit(): void {
    this.onLoadData();
  }

  handleActionClick(ev: I_ToolbarComponent_ActionClick) {
    switch (ev.code) {
      case Action_Type_Enum.ADD: {
        // this.setRouter(this._urlVoucherFormEdit, null, ev.code);
        if (this.thongTinLoaiCongViecEditComponent) {
          this.thongTinLoaiCongViecEditComponent.setShowPopup({ state: true, data: null, typeAction: ev.code });
        }
        break;
      }
      case Action_Type_Enum.VIEW:
      case Action_Type_Enum.EDIT:
      case Action_Type_Enum.COPY: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();
        if (dataSelected && dataSelected[0]) {
          if (this.thongTinLoaiCongViecEditComponent) {
            this.thongTinLoaiCongViecEditComponent.setShowPopup({ state: true, data: dataSelected[0], typeAction: ev.code });
          }
        } else {
          this.showMessageError(this.translate('Vui lòng chọn ít nhất 1 dòng để thực hiện', 'Please select at least 1 row to execute'));
        }
        break;
      }
      case Action_Type_Enum.DELETE: {
        const dataSelected = this.dataGridComponent?.getRowSelectedData();

        const userConfirm = confirm(this.translate('Bạn có chắc chắn muốn xóa', 'Are you sure to delete'));

        if (dataSelected && dataSelected[0] && userConfirm) {
          const itemSelected = dataSelected[0] as TypeEmployeeModel;
          const obj = new TypeEmployeeModel();
          obj.id = itemSelected.id;
          obj.company_code = itemSelected.company_code;
          this.hRMCommonClient.typeWorkDelete(obj).subscribe(res => {
            if (res.status == 0) {
              this.onLoadData();
              this.showMessageSuccess(res.msg!)
            }else
            this.showMessageError(res.msg!)
          }, error => {
            if (error.status == 401 || error.status == 403) this.setLogin(false);
            else if (error.status == 500) this.showMessageError(error.msg)
          });
        } else if (!userConfirm) {        }
        else {
          this.showMessageError(this.translate('Vui lòng chọn ít nhất 1 dòng để thực hiện', 'Please select at least 1 row to execute'));
        }
        break;
      }
    }
  }


  onLoadData() {
    this._loading = true;
    this.hRMCommonClient.typeWorkSearch(new TypeEmployeeModel({
      is_delete: false,
    })).subscribe(res => {
      if (res.status == 0) {
        this.InputMaster = res.data!;
      } else {
        this.showMessageError(res.msg!)
      }
      this._loading = false;
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
      this._loading = false;
    });
  }

  ActionEditSuccess(event: { code: Action_Type_Enum, data: TypeEmployeeModel }) {
    const id = event!.data!.id!
    this.onLoadData();
    this.dataGridComponent?.dxDataGridComponent?.instance.selectRows([id], true);
  }
}