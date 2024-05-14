import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatagridColumnSettingsService {

  constructor() { }

  columnSettings: { code: string, name: string, nameVN: string }[] = [
    { code: 'table_name', name: 'Table name', nameVN: 'Tên bảng' },
    { code: 'dataField', name: 'Data Field', nameVN: 'Data Field' },
    { code: 'caption', name: 'Col name(EN)', nameVN: 'Tên cột (Tiếng anh)' },
    { code: 'caption_VN', name: 'Col name (VN)', nameVN: 'Tên cột (Tiếng việt)' },
    { code: 'name', name: 'name', nameVN: 'name' },
    { code: 'dataType', name: 'Data type', nameVN: 'Kiểu dữ liệu' },
    { code: 'format', name: 'Format', nameVN: 'Định dạng' },
    { code: 'width', name: 'Width', nameVN: 'width' },
    { code: 'visible', name: 'Visible', nameVN: 'Hiển thị' },
    { code: 'minWidth', name: 'Min width', nameVN: 'minWidth' },
    { code: 'alignment', name: 'Alignment', nameVN: 'Căn chỉnh' },
    { code: 'allowEditing', name: 'allowEditing', nameVN: 'allowEditing' },
    { code: 'allowFiltering', name: 'allowFiltering', nameVN: 'allowFiltering' },
    { code: 'allowFixing', name: 'allowFixing', nameVN: 'allowFixing' },
    { code: 'allowGrouping', name: 'allowGrouping', nameVN: 'allowGrouping' },
    { code: 'allowHeaderFiltering', name: 'allowHeaderFiltering', nameVN: 'allowHeaderFiltering' },
    { code: 'allowHiding', name: 'allowHiding', nameVN: 'allowHiding' },
    { code: 'allowSearch', name: 'allowSearch', nameVN: 'allowSearch' },
    { code: 'allowSorting', name: 'allowSorting', nameVN: 'allowSorting' },
    { code: 'autoExpandGroup', name: 'autoExpandGroup', nameVN: 'autoExpandGroup' },
    { code: 'columns', name: 'columns', nameVN: 'columns' },
    { code: 'column_child', name: 'column_child', nameVN: 'column_child' },
    { code: 'cssClass', name: 'cssClass', nameVN: 'cssClass' },
    { code: 'orderNo', name: 'Order no', nameVN: 'Thứ tự' },
  ]


  dataSourceAlignment = [
    { code: 'left', name: 'left', nameVN: 'left' },
    { code: 'center', name: 'center', nameVN: 'center' },
    { code: 'right', name: 'right', nameVN: 'right' },
  ]

  dataSourceDataType = [
    { code: 'number', name: 'number', nameVN: 'number' },
    { code: 'string', name: 'string', nameVN: 'string' },
    { code: 'boolean', name: 'boolean', nameVN: 'boolean' },
    { code: 'date', name: 'date', nameVN: 'date' },
  ]

  dataSourceFormat = [
    { code: 'currency', name: 'currency', nameVN: 'currency' },
    { code: 'fixedPoint', name: 'fixedPoint', nameVN: 'fixedPoint' },
    { code: 'currency', name: 'currency', nameVN: 'currency' },
    { code: 'decimal', name: 'decimal', nameVN: 'decimal' },
    { code: 'percent', name: 'percent', nameVN: 'percent' },
    { code: 'date', name: 'date', nameVN: 'date' },
    { code: 'time', name: 'time', nameVN: 'time' },
    { code: ',##0.###', name: ',##0.###', nameVN: ',##0.###' }
  ]

  getColumnByCode(code: string) {
    return this.columnSettings.find(x => x.code === code);
  }
}
