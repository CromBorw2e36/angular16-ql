import { CategoryCommonClient, CommonContronllerClient, MovieClient, MovieCommentClient, MovieFavoritesClient, MovieGenresClient, MovieReviewClient, MovieWatchHistoryClient } from './../system/server/api_share';
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
import { AccountsClient, MenuPermissionsClient, SysMenusClient, SysVoucherFormClient, UserInfoesClient } from '../system/server/api_share';
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
import { MatTabsModule } from '@angular/material/tabs';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import routes from './share.routes';
import { NgxBootstrapIconsModule, alarm, alarmFill, alignBottom, fullscreen, fullscreenExit, pencilSquare } from 'ngx-bootstrap-icons';
import { VoucherFormColumnSettingsListComponent } from './99_00_00/voucher-form-column-settings/voucher-form-column-settings-list/voucher-form-column-settings-list.component';
import { VoucherFormColumnSettingsEditComponent } from './99_00_00/voucher-form-column-settings/voucher-form-column-settings-edit/VoucherFormColumnSettingsEditComponent';
import { DatagridColumnSettingListComponent } from './99_00_00/datagrid-column-setting/datagrid-column-setting-list/datagrid-column-setting-list.component';
import { DatagridColumnSettingListEditComponent } from './99_00_00/datagrid-column-setting/datagrid-column-setting-list-edit/datagrid-column-setting-list-edit.component';
import { DatagridColumnSettingListFilterComponent } from './99_00_00/datagrid-column-setting/datagrid-column-setting-list-filter/datagrid-column-setting-list-filter.component';
import { VoucherFormGroupTabSettingListComponent } from './99_00_00/voucher-form-group_tab-settings/voucher-form-group-tab-setting-list/voucher-form-group-tab-setting-list.component';
import { VoucherFormGroupTabSettingEditComponent } from './99_00_00/voucher-form-group_tab-settings/voucher-form-group-tab-setting-edit/voucher-form-group-tab-setting-edit.component';
import { SystemMenuSettingsListComponent } from './99_00_00/system-menu-settings/system-menu-settings-list/system-menu-settings-list.component';
import { SystemMenuSettingsEditComponent } from './99_00_00/system-menu-settings/system-menu-settings-edit/system-menu-settings-edit.component';
import { CategoryCommonListComponent } from './99_00_00/category-common/category-common-list/category-common-list.component';
import { CategoryCommonEditComponent } from './99_00_00/category-common/category-common-edit/category-common-edit.component';
import { VoucherFormGroupTabListComponent } from './99_00_00/99_22_00/voucher-form-group-tab/voucher-form-group-tab-list/voucher-form-group-tab-list.component';
import { VoucherFormGroupTabEditComponent } from './99_00_00/99_22_00/voucher-form-group-tab/voucher-form-group-tab-edit/voucher-form-group-tab-edit.component';
import { PermissionListComponent } from './99_00_00/99_23_00/99_23_01/permission-list/permission-list.component';
import { PermissionEditComponent } from './99_00_00/99_23_00/99_23_01/permission-edit/permission-edit.component';
import { TypeAccountListComponent } from './99_00_00/99_23_00/99_23_02/type-account-list/type-account-list.component';
import { TypeAccountEditComponent } from './99_00_00/99_23_00/99_23_02/type-account-edit/type-account-edit.component';
import { NationalAndLanguageListComponent } from './99_00_00/99_23_00/99_23_03/national-and-language-list/national-and-language-list.component';
import { NationalAndLanguageEditComponent } from './99_00_00/99_23_00/99_23_03/national-and-language-edit/national-and-language-edit.component';
import { StatusListComponent } from './99_00_00/99_23_00/99_23_05/status-list/status-list.component';
import { StatusEditComponent } from './99_00_00/99_23_00/99_23_05/status-edit/status-edit.component';
import { AccountListComponent } from './99_00_00/99_10_00/99_10_01/account-list/account-list.component';
import { AccountEditComponent } from './99_00_00/99_10_00/99_10_01/account-edit/account-edit.component';
import { AccountRegisterListComponent } from './99_00_00/99_10_00/99_10_04/account-register-list/account-register-list.component';
import { AccountRegisterEditComponent } from './99_00_00/99_10_00/99_10_04/account-register-edit/account-register-edit.component';
import { RoleMenuListComponent } from './99_00_00/99_10_00/99_10_02/role-menu-list/role-menu-list.component';
import { RoleMenuEditComponent } from './99_00_00/99_10_00/99_10_02/role-menu-edit/role-menu-edit.component';
import { RoleMenuPopupComponent } from './99_00_00/99_10_00/99_10_02/role-menu-edit/role-menu-popup/role-menu-popup.component';
import { AccountAddEditComponent } from './99_00_00/99_10_00/99_10_01/account-add-edit/account-add-edit.component';
import { GenresListComponent } from './20_00_00/20_01_00/20_01_01/genres-list/genres-list.component';
import { GenresEditComponent } from './20_00_00/20_01_00/20_01_01/genres-edit/genres-edit.component';
import { MovieEditComponent } from './20_00_00/20_01_00/20_04_00/20_04_01/movie-edit/movie-edit.component';
import { MovieListComponent } from './20_00_00/20_01_00/20_04_00/20_04_01/movie-list/movie-list.component';
import { VoucherFormColumnSettingsEditV2Component } from './99_00_00/voucher-form-column-settings/voucher-form-column-settings-edit-v2/voucher-form-column-settings-edit-v2.component';

const icons = {
  alarm,
  alarmFill,
  alignBottom,
  pencilSquare,
  fullscreenExit,
  fullscreen
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
    VoucherFormGroupTabSettingListComponent,
    VoucherFormGroupTabSettingEditComponent,
    SystemMenuSettingsListComponent,
    SystemMenuSettingsEditComponent,
    CategoryCommonListComponent,
    CategoryCommonEditComponent,
    VoucherFormGroupTabListComponent,
    VoucherFormGroupTabEditComponent,
    PermissionListComponent,
    PermissionEditComponent,
    TypeAccountListComponent,
    TypeAccountEditComponent,
    NationalAndLanguageListComponent,
    NationalAndLanguageEditComponent,
    StatusListComponent,
    StatusEditComponent,
    AccountListComponent,
    AccountEditComponent,
    AccountRegisterListComponent,
    AccountRegisterEditComponent,
    RoleMenuListComponent,
    RoleMenuEditComponent,
    RoleMenuPopupComponent,
    AccountAddEditComponent,
    GenresListComponent,
    GenresEditComponent,
    MovieEditComponent,
    MovieListComponent,
    VoucherFormColumnSettingsEditV2Component,
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    DeviceDetectorService,
    UserInfoesClient,
    SysVoucherFormClient,
    SysMenusClient,
    CommonContronllerClient,
    CategoryCommonClient,
    MovieGenresClient,
    MovieCommentClient,
    MovieFavoritesClient,
    MovieWatchHistoryClient,
    MovieReviewClient,
    MovieClient,
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
export class ShareModule { }
