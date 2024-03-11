import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from '../components/menu/menu.component';
import { LoadPanelDevextremeComponent } from '../components/Loading/load-panel-devextreme/load-panel-devextreme.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DxLoadPanelModule, DxTextBoxModule } from 'devextreme-angular';
import { SelectBoxCompanyComponent } from './common/select-box-company/select-box-company.component';
import { MatIconModule } from '@angular/material/icon';
import { CookieService } from 'ngx-cookie-service';
import { ConfigServerService } from '../system/server/config/config-server.service';
import {
  AccountsClient,
  MenuPermissionsClient,
} from '../system/server/api_share';
import { SysLoginService } from '../system/service/sys-login/sys-login.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { TextBoxComponent } from './editor/text-box/text-box.component';
import { RouterModule, Routes } from '@angular/router';
import { TextBoxDevextremeComponent } from './editor/text-box-devextreme/text-box-devextreme.component';

const routes: Routes = [
  { path: 'editor-text-box', component: TextBoxComponent },

];

@NgModule({
  declarations: [
    MenuComponent,
    LoadPanelDevextremeComponent,
    SelectBoxCompanyComponent,
    TextBoxComponent,
    TextBoxDevextremeComponent,
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
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    SysLoginService,
  ],
  exports: [MenuComponent, LoadPanelDevextremeComponent, TextBoxDevextremeComponent],
})
export class ComponentModule {}
