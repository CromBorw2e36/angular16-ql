import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadPanelDevextremeComponent } from '../components/Loading/load-panel-devextreme/load-panel-devextreme.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DxButtonModule, DxCheckBoxModule, DxDataGridModule, DxDateBoxModule, DxLoadPanelModule, DxNumberBoxModule, DxPopupModule, DxRadioGroupModule, DxScrollViewModule, DxSelectBoxModule, DxTabPanelModule, DxTextBoxModule, DxTreeViewModule } from 'devextreme-angular';
import { SelectBoxCompanyComponent } from './common/select-box-company/select-box-company.component';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { ConfigServerService } from '../system/server/config/config-server.service';
import {
  AccountsClient,
  CommonContronllerClient,
  MenuPermissionsClient,
  SysActionClient,
  SysGenRowTablesClient,
  SysGroupAction,
  SysVoucherFormClient,
} from '../system/server/api_share';
import { SysLoginService } from '../system/service/sys-login/sys-login.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { TextBoxComponent } from './editor/text-box/text-box.component';
import { RouterModule, Routes } from '@angular/router';
import { TextBoxDevextremeComponent } from './editor/text-box-devextreme/text-box-devextreme.component';
import { LoadingIconComponent } from './Loading/loading-icon/loading-icon.component';
import { MenuV2Component } from './menu-v2/menu-v2.component';
import { TreeViewComponent } from './js-devextreme/navigation/tree-view/tree-view.component';
import routes from './component.routes';
import { ControlInputBlockComponent } from './form/control-input-block/control-input-block.component';
import { ControlTextBoxComponent } from './js-devextreme/editor/text-box/text-box.component';
import { NumberBoxComponent } from './js-devextreme/editor/number-box/number-box.component';
import { DateBoxComponent } from './js-devextreme/editor/date-box/date-box.component';
import { CheckBoxComponent } from './js-devextreme/editor/check-box/check-box.component';
import { DataGridComponent } from './js-devextreme/data-grid/data-grid.component';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { BreadcrumbComponent } from './common/breadcrumb/breadcrumb.component';
import { PopupComponent } from './js-devextreme/popup/popup.component';
import dxScrollView from 'devextreme/ui/scroll_view';
import { SelectBoxComponent } from './js-devextreme/editor/select-box/select-box.component';
import { VoucherFormColItemComponent } from './form/voucher-form/voucher-form-col-item/voucher-form-col-item.component';
import { VoucherFormGroupItemComponent } from './form/voucher-form/voucher-form-group-item/voucher-form-group-item.component';
import { VoucherFormComponent } from './form/voucher-form/voucher-form/voucher-form.component';
import { FileUploaderComponent } from './editor/file-uploader/file-uploader.component';
import { NgxBootstrapIconsModule, box, folder2 } from 'ngx-bootstrap-icons';
import { AvatarImageComponent } from './editor/avatar-image/avatar-image.component';

const icons = {
  box,
  folder2
};
@NgModule({
  declarations: [
    LoadPanelDevextremeComponent,
    SelectBoxCompanyComponent,
    TextBoxComponent,
    TextBoxDevextremeComponent,
    LoadingIconComponent,
    MenuV2Component,
    TreeViewComponent,
    ControlInputBlockComponent,
    ControlTextBoxComponent,
    NumberBoxComponent,
    DateBoxComponent,
    CheckBoxComponent,
    DataGridComponent,
    ToolBarComponent,
    BreadcrumbComponent,
    PopupComponent,
    SelectBoxComponent,
    VoucherFormColItemComponent,
    VoucherFormGroupItemComponent,
    VoucherFormComponent,
    FileUploaderComponent,
    AvatarImageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DxLoadPanelModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatButtonModule,
    DxTextBoxModule,
    DxCheckBoxModule,
    DxDateBoxModule,
    DxTreeViewModule,
    DxNumberBoxModule,
    DxDateBoxModule,
    DxCheckBoxModule,
    DxRadioGroupModule,
    DxTabPanelModule,
    DxDataGridModule,
    DxButtonModule,
    DxPopupModule,
    DxScrollViewModule,
    DxSelectBoxModule,
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    SysLoginService,
    SysGenRowTablesClient,
    SysActionClient,
    SysVoucherFormClient,
    CommonContronllerClient
  ],
  exports: [
    LoadPanelDevextremeComponent,
    TextBoxDevextremeComponent,
    LoadingIconComponent,
    MenuV2Component,
    TreeViewComponent,
    ControlTextBoxComponent,
    NumberBoxComponent,
    DateBoxComponent,
    CheckBoxComponent,
    SelectBoxComponent,
    ToolBarComponent,
    DataGridComponent,
    ToolBarComponent,
    BreadcrumbComponent,
    PopupComponent,
    VoucherFormComponent,
    AvatarImageComponent
  ],
})
export class ComponentModule { }
