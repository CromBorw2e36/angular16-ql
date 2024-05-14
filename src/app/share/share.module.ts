import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { QlTaiKhoanComponent } from './99_00_00/ql-tai-khoan/ql-tai-khoan.component';
import { CookieService } from 'ngx-cookie-service';
import { AccountsClient, MenuPermissionsClient, SysVoucherFormClient, UserInfoesClient } from '../system/server/api_share';
import { ConfigServerService } from '../system/server/config/config-server.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentModule } from '../components/component.module';
import { MatButtonModule } from '@angular/material/button';
import { DxButtonModule, DxTextBoxModule } from 'devextreme-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import routes from './share.routes';
import { NgxBootstrapIconsModule, alarm, alarmFill, alignBottom, pencilSquare } from 'ngx-bootstrap-icons';
import { VoucherFormColumnSettingsListComponent } from './99_00_00/voucher-form-column-settings/voucher-form-column-settings-list/voucher-form-column-settings-list.component';
import { VoucherFormColumnSettingsEditComponent } from './99_00_00/voucher-form-column-settings/voucher-form-column-settings-edit/VoucherFormColumnSettingsEditComponent';
import { DatagridColumnSettingListComponent } from './99_00_00/datagrid-column-setting/datagrid-column-setting-list/datagrid-column-setting-list.component';
import { DatagridColumnSettingListEditComponent } from './99_00_00/datagrid-column-setting/datagrid-column-setting-list-edit/datagrid-column-setting-list-edit.component';
import { DatagridColumnSettingListFilterComponent } from './99_00_00/datagrid-column-setting/datagrid-column-setting-list-filter/datagrid-column-setting-list-filter.component';

const icons = {
  alarm,
  alarmFill,
  alignBottom,
  pencilSquare
};
@NgModule({
  declarations: [
    QlTaiKhoanComponent,
    NotFoundPageComponent,
    VoucherFormColumnSettingsListComponent,
    VoucherFormColumnSettingsEditComponent,
    DatagridColumnSettingListComponent,
    DatagridColumnSettingListEditComponent,
    DatagridColumnSettingListFilterComponent,
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    DeviceDetectorService,
    UserInfoesClient,
    SysVoucherFormClient,
   ],
  exports: [QlTaiKhoanComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    HttpClientModule,
    FormsModule,
    ComponentModule,
    MatSidenavModule,
    MatButtonModule,
    DxButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTabsModule,
    DxTextBoxModule,
    NgxBootstrapIconsModule.pick(icons)

  ],
})
export class ShareModule {}
