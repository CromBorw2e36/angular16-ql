import { CommonContronllerClient, QueryCommonModel } from './../../../../system/server/api_share';
import { Component, EventEmitter, Injector, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { DxDateBoxTypes } from 'devextreme-angular/ui/date-box';
import { DxNumberBoxTypes } from 'devextreme-angular/ui/number-box';
import { dxDateBoxOptions } from 'devextreme/ui/date_box';
import { ValueChangedEvent } from 'devextreme/ui/text_box';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysVoucherFormColumn } from 'src/app/system/server/api_share';

export interface I_EventValueChange<T> {
  dataField: string;
  value: T;
}

@Component({
  selector: 'app-voucher-form-col-item',
  templateUrl: './voucher-form-col-item.component.html',
  styleUrls: ['./voucher-form-col-item.component.scss']
})
export class VoucherFormColItemComponent extends LayoutComponentBase implements OnChanges {
  constructor(
    injector: Injector,
    private commonClient: CommonContronllerClient
  ) {
    super(injector);
  }


  typeComponent = {
    textBox: 'TEXTBOX',
    checkBox: "CHECKBOX",
    dateBox: "DATEBOX",
    numberBox: "NUMBERBOX",
    comboBox: "COMBOBOX",
    textArea: "TEXTAREA",
  }

  dataSourceItems: any[] = [];

  @Input('InputConfig') InputMaster: SysVoucherFormColumn = new SysVoucherFormColumn();
  @Input() value: any = undefined;
  @Output() valueChange = new EventEmitter<any>();

  ngOnChanges(changes: SimpleChanges): void {
    if ('InputMaster' in changes) {
      this.InputMaster = changes['InputMaster'].currentValue;
      if (this.InputMaster.typeControl === this.typeComponent.comboBox) {
        this.getDataSourceSelectBox();
      }
    }
  }


  handleValueChange(value: ValueChangedEvent | any) {
    const obj: I_EventValueChange<any> = {
      dataField: this.InputMaster.code!,
      value: value,
    }
    this.valueChange.emit(obj);
  }

  get GenValueConfig() {
    return this.InputMaster as any
  }

  get GenValueConfigDate() {
    if (this.InputMaster.mode === undefined) this.InputMaster.mode = "text";
    return this.InputMaster as DxDateBoxTypes.Properties;
  }



  get GenValueConfigNumber() {
    const obj = this.InputMaster as DxNumberBoxTypes.Properties;
    obj.showSpinButtons = true;
    return obj as DxNumberBoxTypes.Properties;
  }

  getDataSourceSelectBox() {
    const obj = {
      string_query: this.InputMaster.query,
    } as QueryCommonModel
    this.commonClient.excuteQueryString(obj).subscribe(res => {
      this.dataSourceItems = res;
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(this.translate(`Không thể tải dữ liệu của  ${this.InputMaster.labelControlVN}`, `Cannot load data of ${this.InputMaster.labelControl}`));
      this.dataSourceItems = [];
    })
  }

}
