import { Component, Injector, Input, OnInit } from '@angular/core';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysVoucherFormClient, SysVoucherFormColumn } from 'src/app/system/server/api_share';


@Component({
  selector: 'app-voucher-form-column-settings-edit',
  templateUrl: './voucher-form-column-settings-edit.component.html',
  styleUrls: ['./voucher-form-column-settings-edit.component.scss']
})
export class VoucherFormColumnSettingsEditComponent extends LayoutComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private sysVoucherFormClient: SysVoucherFormClient
  ) {
    super(injector);
  }

  table_name: string = 'SYS_VOUCHER_FORM_COLUMN';
  InputMaster: SysVoucherFormColumn = new SysVoucherFormColumn();
  @Input() dataFilter: SysVoucherFormColumn = new SysVoucherFormColumn();

  ngOnInit(): void {
    this.sysVoucherFormClient.voucherFormGroupSearch(this.dataFilter).subscribe(x => {
      if (x.data) {
        const data = x.data.find(x => x.id === this.dataFilter.id);
        if (data) {
          this.InputMaster = data;
        }
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    })
  }

}
