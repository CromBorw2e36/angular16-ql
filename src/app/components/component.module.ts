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
  MenuPermissionsClient,
  SysActionClient,
  SysGenRowTablesClient,
  SysGroupAction,
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
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    SysLoginService,
    SysGenRowTablesClient,
    SysActionClient,
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
  ],
})
export class ComponentModule { }
