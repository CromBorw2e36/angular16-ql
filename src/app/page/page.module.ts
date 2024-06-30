import { CategoryCommonClient, CommonContronllerClient, HRMCommonClient, MovieClient, MovieCommentClient, MovieFavoritesClient, MovieGenresClient, MovieReviewClient, MovieWatchHistoryClient } from '../system/server/api_share';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  RouterOutlet,
  Routes,
} from '@angular/router';
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
import routes from './page.routes';
import { NgxBootstrapIconsModule, alarm, alarmFill, alignBottom, fullscreen, fullscreenExit, pencilSquare } from 'ngx-bootstrap-icons';
import { ThongTinPhongBanListComponent } from './HRM_module/danh-muc/thong-tin-phong-ban/thong-tin-phong-ban-list/thong-tin-phong-ban-list.component';
import { ThongTinPhongBanEditComponent } from './HRM_module/danh-muc/thong-tin-phong-ban/thong-tin-phong-ban-edit/thong-tin-phong-ban-edit.component';
import { ViTriNhanSuListComponent } from './HRM_module/danh-muc/vi-tri-nhan-su/vi-tri-nhan-su-list/vi-tri-nhan-su-list.component';
import { ViTriNhanSuEditComponent } from './HRM_module/danh-muc/vi-tri-nhan-su/vi-tri-nhan-su-edit/vi-tri-nhan-su-edit.component';
import { ThongTinTrangThaiNhanVienListComponent } from './HRM_module/danh-muc/thong-tin-trang-thai-nhan-vien/thong-tin-trang-thai-nhan-vien-list/thong-tin-trang-thai-nhan-vien-list.component';
import { ThongTinTrangThaiNhanVienEditComponent } from './HRM_module/danh-muc/thong-tin-trang-thai-nhan-vien/thong-tin-trang-thai-nhan-vien-edit/thong-tin-trang-thai-nhan-vien-edit.component';
import { ThongTinLoaiNhanVienListComponent } from './HRM_module/danh-muc/thong-tin-loai-nhan-vien/thong-tin-loai-nhan-vien-list/thong-tin-loai-nhan-vien-list.component';
import { ThongTinLoaiNhanVienEditComponent } from './HRM_module/danh-muc/thong-tin-loai-nhan-vien/thong-tin-loai-nhan-vien-edit/thong-tin-loai-nhan-vien-edit.component';
import { ThongTinLoaiCongViecListComponent } from './HRM_module/danh-muc/thong-tin-loai-cong-viec/thong-tin-loai-cong-viec-list/thong-tin-loai-cong-viec-list.component';
import { ThongTinLoaiCongViecEditComponent } from './HRM_module/danh-muc/thong-tin-loai-cong-viec/thong-tin-loai-cong-viec-edit/thong-tin-loai-cong-viec-edit.component';

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
    ThongTinPhongBanListComponent,
    ThongTinPhongBanEditComponent,
    ViTriNhanSuListComponent,
    ViTriNhanSuEditComponent,
    ThongTinTrangThaiNhanVienListComponent,
    ThongTinTrangThaiNhanVienEditComponent,
    ThongTinLoaiNhanVienListComponent,
    ThongTinLoaiNhanVienEditComponent,
    ThongTinLoaiCongViecListComponent,
    ThongTinLoaiCongViecEditComponent
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
    HRMCommonClient,
  ],
  exports: [],
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
export class PageModule { }
