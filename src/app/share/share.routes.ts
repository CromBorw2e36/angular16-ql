import { Routes } from "@angular/router";
import { QlTaiKhoanComponent } from "./99_00_00/ql-tai-khoan/ql-tai-khoan.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { VoucherFormColumnSettingsListComponent } from "./99_00_00/voucher-form-column-settings/voucher-form-column-settings-list/voucher-form-column-settings-list.component";
import { DatagridColumnSettingListComponent } from "./99_00_00/datagrid-column-setting/datagrid-column-setting-list/datagrid-column-setting-list.component";
 
const routes: Routes = [
    { path: 'ql-tai-khoan', component: QlTaiKhoanComponent },
    { path: 'voucher-form-column-settings', component: VoucherFormColumnSettingsListComponent },
    { path: 'datagrid-column-setting', component: DatagridColumnSettingListComponent },
    { path: '**', component: NotFoundPageComponent },
  ];
  
  export default routes;