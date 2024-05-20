import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-voucher-form-group-tab-setting-list',
  templateUrl: './voucher-form-group-tab-setting-list.component.html',
  styleUrls: ['./voucher-form-group-tab-setting-list.component.scss']
})
export class VoucherFormGroupTabSettingListComponent {



  value: any;


  get DateFormat() {
    return moment(this.value).format('DD/MM/YYYY');
  }
}
