import { Routes } from "@angular/router";
import { QlTaiKhoanComponent } from "./99_00_00/ql-tai-khoan/ql-tai-khoan.component";
import { NotFoundPageComponent } from "./not-found-page/not-found-page.component";
import { VoucherFormColumnSettingsListComponent } from "./99_00_00/voucher-form-column-settings/voucher-form-column-settings-list/voucher-form-column-settings-list.component";
import { DatagridColumnSettingListComponent } from "./99_00_00/datagrid-column-setting/datagrid-column-setting-list/datagrid-column-setting-list.component";
import { VoucherFormGroupTabSettingListComponent } from "./99_00_00/voucher-form-group_tab-settings/voucher-form-group-tab-setting-list/voucher-form-group-tab-setting-list.component";
import { VoucherFormColumnSettingsEditComponent } from "./99_00_00/voucher-form-column-settings/voucher-form-column-settings-edit/VoucherFormColumnSettingsEditComponent";
import { SystemMenuSettingsListComponent } from "./99_00_00/system-menu-settings/system-menu-settings-list/system-menu-settings-list.component";
import { SystemMenuSettingsEditComponent } from "./99_00_00/system-menu-settings/system-menu-settings-edit/system-menu-settings-edit.component";
import { CategoryCommonListComponent } from "./99_00_00/category-common/category-common-list/category-common-list.component";
import { CategoryCommonEditComponent } from "./99_00_00/category-common/category-common-edit/category-common-edit.component";
import { VoucherFormGroupTabListComponent } from "./99_00_00/99_22_00/voucher-form-group-tab/voucher-form-group-tab-list/voucher-form-group-tab-list.component";
import { VoucherFormGroupTabEditComponent } from "./99_00_00/99_22_00/voucher-form-group-tab/voucher-form-group-tab-edit/voucher-form-group-tab-edit.component";
import { PermissionListComponent } from "./99_00_00/99_23_00/99_23_01/permission-list/permission-list.component";
import { PermissionEditComponent } from "./99_00_00/99_23_00/99_23_01/permission-edit/permission-edit.component";
import { TypeAccountListComponent } from "./99_00_00/99_23_00/99_23_02/type-account-list/type-account-list.component";
import { TypeAccountEditComponent } from "./99_00_00/99_23_00/99_23_02/type-account-edit/type-account-edit.component";
import { NationalAndLanguageListComponent } from "./99_00_00/99_23_00/99_23_03/national-and-language-list/national-and-language-list.component";
import { NationalAndLanguageEditComponent } from "./99_00_00/99_23_00/99_23_03/national-and-language-edit/national-and-language-edit.component";
import { StatusEditComponent } from "./99_00_00/99_23_00/99_23_05/status-edit/status-edit.component";
import { StatusListComponent } from "./99_00_00/99_23_00/99_23_05/status-list/status-list.component";

const routes: Routes = [
  { path: 'ql-tai-khoan', component: QlTaiKhoanComponent },

  { path: 'voucher-form-column-settings', component: VoucherFormColumnSettingsListComponent, data: { table_name: "99_00_00_VoucherForm" } },
  { path: 'app-voucher-form-column-settings-edit', component: VoucherFormColumnSettingsEditComponent, data: { table_name: "SysVoucherFormColumn" } },

  { path: 'datagrid-column-setting', component: DatagridColumnSettingListComponent },

  { path: 'system-menu-settings', component: SystemMenuSettingsListComponent, data: { table_name: "99_22_00_SysMenu", url_voucher_form_edit: 'system-menu-settings-edit' } },
  { path: 'system-menu-settings-edit', component: SystemMenuSettingsEditComponent, data: { table_name: "99_22_00_SysMenu" } },

  { path: 'category-common', component: CategoryCommonListComponent, data: { table_name: "99.20.03_CategoryCommon", url_voucher_form_edit: 'category-common-edit' } },
  { path: 'category-common-edit', component: CategoryCommonEditComponent, data: { table_name: "99.20.03_CategoryCommon" } },

  { path: 'datagrid-table-list', component: CategoryCommonListComponent, data: { table_name: "99.21.01_TableName", url_voucher_form_edit: 'datagrid-table-edit' } },
  { path: 'datagrid-table-edit', component: CategoryCommonEditComponent, data: { table_name: "99.21.01_TableName" } },

  { path: 'voucher-form-group-tab-list', component: VoucherFormGroupTabListComponent, data: { table_name: "99.20.02_SysVoucherFormGroup", url_voucher_form_edit: 'voucher-form-group-tab-edit' } },
  { path: 'voucher-form-group-tab-edit', component: VoucherFormGroupTabEditComponent, data: { table_name: "99.20.02_SysVoucherFormGroup" } },

  { path: 'voucher-form-group-tab-list', component: VoucherFormGroupTabListComponent, data: { table_name: "99.20.02_SysVoucherFormGroup", url_voucher_form_edit: 'voucher-form-group-tab-edit' } },
  { path: 'voucher-form-group-tab-edit', component: VoucherFormGroupTabEditComponent, data: { table_name: "99.20.02_SysVoucherFormGroup" } },

  
  { path: 'permission-list', component: PermissionListComponent, data: { table_name: "99.23.01_SysPermission", url_voucher_form_edit: 'permission-edit' } },
  { path: 'permission-edit', component: PermissionEditComponent, data: { table_name: "99.23.01_SysPermission" } },

  { path: 'type-account-list', component: TypeAccountListComponent, data: { table_name: "99.23.02_SysTypeAccount", url_voucher_form_edit: 'type-account-edit' } },
  { path: 'type-account-edit', component: TypeAccountEditComponent, data: { table_name: "99.23.02_SysTypeAccount" } },

  { path: 'national-and-language-list', component: NationalAndLanguageListComponent, data: { table_name: "99.23.03_National", url_voucher_form_edit: 'national-and-language-edit' } },
  { path: 'national-and-language-edit', component: NationalAndLanguageEditComponent, data: { table_name: "99.23.03_National" } },

  { path: 'status-list', component: StatusListComponent, data: { table_name: "99.23.05_SysStatus", url_voucher_form_edit: 'status-edit' } },
  { path: 'status-edit', component: StatusEditComponent, data: { table_name: "99.23.05_SysStatus" } },


  { path: '**', component: NotFoundPageComponent },
];

export default routes;