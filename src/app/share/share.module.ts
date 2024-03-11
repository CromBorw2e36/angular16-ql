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
import { AccountsClient, MenuPermissionsClient, UserInfoesClient } from '../system/server/api_share';
import { ConfigServerService } from '../system/server/config/config-server.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentModule } from '../components/component.module';
import { MatButtonModule } from '@angular/material/button';
import { DxButtonModule } from 'devextreme-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTabsModule} from '@angular/material/tabs';

const routes: Routes = [
  { path: 'ql-tai-khoan', component: QlTaiKhoanComponent },
];

@NgModule({
  declarations: [
    QlTaiKhoanComponent,
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    DeviceDetectorService,
    UserInfoesClient
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
  ],
})
export class ShareModule {}
