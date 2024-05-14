import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { DxTextBoxTypes } from 'devextreme-angular/ui/text-box';
import { DataGridComponent } from 'src/app/components/js-devextreme/data-grid/data-grid.component';
import LayoutComponentBase from 'src/app/share/layoutBase/LayoutComponentBase';
import { SysVoucherFormClient, SysVoucherFormColumn } from 'src/app/system/server/api_share';

@Component({
  selector: 'app-voucher-form-column-settings-list',
  templateUrl: './voucher-form-column-settings-list.component.html',
  styleUrls: ['./voucher-form-column-settings-list.component.scss']
})
export class VoucherFormColumnSettingsListComponent extends LayoutComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private sysVoucherFormClient: SysVoucherFormClient,
  ) {
    super(injector);
  }

  value: string = '';
  InputMaster: Array<SysVoucherFormColumn> = [];

  @ViewChild('dataGridComponent') dataGridComponent: DataGridComponent | undefined;

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData() {
    this.sysVoucherFormClient.voucherFormColumnSearch({ id: "12312" } as SysVoucherFormColumn).subscribe(res => {
      if (res.data) {
        this.InputMaster = res.data;
      }
    }, error => {
      if (error.status == 401 || error.status == 403) this.setLogin(false);
      else if (error.status == 500) this.showMessageError(error.msg)
    });
  }

}
