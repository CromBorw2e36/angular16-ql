import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './page/login-form/login-form.component';
import { ComponentModule } from '../components/component.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { AccountsClient, MenuPermissionsClient } from './server/api_share';
import { APIBase } from './server/APIBase';
import { ConfigServerService } from './server/config/config-server.service';
import { DxButtonModule } from 'devextreme-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MenuPageComponent } from './page/menu-page/menu-page.component';
import { AppComponents } from './server/components';
import { DeviceDetectorService } from 'ngx-device-detector';
import { ListPageMenuComponent } from './page/menu-page/list-page-menu/list-page-menu.component';

const routes: Routes = [
  { path: '', component: MenuPageComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'menu', component: ListPageMenuComponent },
  
];

@NgModule({
  declarations: [
    HomePageComponent,
    DashboardComponent,
    LoginFormComponent,
    MenuPageComponent,
    ListPageMenuComponent,
  ],
  providers: [
    CookieService,
    MenuPermissionsClient,
    ConfigServerService,
    AccountsClient,
    DeviceDetectorService,
   ],
  exports: [HomePageComponent, DashboardComponent, LoginFormComponent],
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
    ComponentModule,
  ],
})
export class SystemModule {}
