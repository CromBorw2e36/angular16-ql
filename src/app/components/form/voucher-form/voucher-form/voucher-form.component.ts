import { I_EventValueChange } from './../voucher-form-col-item/voucher-form-col-item.component';
import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysVoucherFormClient, SysVoucherFormColumn, SysVoucherFormGroup } from 'src/app/system/server/api_share';

export interface IVoucher_Form_UI {
  voucherFormComponent: VoucherFormComponent | undefined
  ValueChangedEventVoucherForm(data: any): void;
}


@Component({
  selector: 'voucher-form-component',
  templateUrl: './voucher-form.component.html',
  styleUrls: ['./voucher-form.component.scss']
})
export class VoucherFormComponent extends LayoutComponentBase implements OnInit {
  constructor(
    injector: Injector,
    private sysVoucherFormClient: SysVoucherFormClient,
  ) {
    super(injector);
  }

  dataSourceVoucherFormColumns: SysVoucherFormColumn[] = [];
  dataSourceVoucherFormGroup: SysVoucherFormGroup[] = [];

  @Input() table_name!: string;
  @Input() InputMaster: any = {};

  @Output() valueChanged = new EventEmitter<any>();

  ngOnInit(): void {
    this.OnLoadVoucherFormGroups();
  }

  ngAfterViewInit(): void {
  }

  OnLoadVoucherFormGroups() {
    const requestParam = {
      table_name: this.table_name
    } as SysVoucherFormColumn
    this.sysVoucherFormClient.voucherFormGroupSearch(requestParam).subscribe(res => {
      if (res.status == 0) {
        this.dataSourceVoucherFormGroup = res.data!;
        // console.log(this.dataSourceVoucherFormGroup)
      } else {
        this.showMessageError(res.msg!);
      }
      this.OnLoadVoucherFormColumns();
    })
  }

  OnLoadVoucherFormColumns() {
    const requestParam = {
      table_name: this.table_name
    } as SysVoucherFormColumn
    this.sysVoucherFormClient.voucherFormColumnSearch(requestParam).subscribe(res => {
      if (res.status == 0) {
        this.dataSourceVoucherFormColumns = res.data!;
        console.log(this.dataSourceVoucherFormColumns)
      } else {
        this.showMessageError(res.msg!);
      }
    })
  }

  handleValueChange(ev: I_EventValueChange<any>) {
    this.InputMaster[ev.dataField] = ev.value;
    // console.log(this.InputMaster);
    this.valueChanged.emit(this.InputMaster);
  }


  handleUpdateInputMaster(paramUpdate: any) {
    this.InputMaster = { ...paramUpdate };
  }

  handleGetValueInputMaster() {
    return this.InputMaster;
  }

  getVoucherFormByGroup(group_id: string) {
    const data = this.dataSourceVoucherFormColumns.filter(x => x.groupId == group_id);
    // console.log(data)
    return data;
  }


  _refresh() {
    this.OnLoadVoucherFormGroups();
  }
}
