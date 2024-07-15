import { Routes } from "@angular/router";
import { ThongTinPhongBanListComponent } from "./HRM_module/danh-muc/thong-tin-phong-ban/thong-tin-phong-ban-list/thong-tin-phong-ban-list.component";
import { ViTriNhanSuListComponent } from "./HRM_module/danh-muc/vi-tri-nhan-su/vi-tri-nhan-su-list/vi-tri-nhan-su-list.component";
import { ThongTinTrangThaiNhanVienListComponent } from "./HRM_module/danh-muc/thong-tin-trang-thai-nhan-vien/thong-tin-trang-thai-nhan-vien-list/thong-tin-trang-thai-nhan-vien-list.component";
import { ThongTinLoaiCongViecListComponent } from "./HRM_module/danh-muc/thong-tin-loai-cong-viec/thong-tin-loai-cong-viec-list/thong-tin-loai-cong-viec-list.component";
import { ThongTinLoaiNhanVienListComponent } from "./HRM_module/danh-muc/thong-tin-loai-nhan-vien/thong-tin-loai-nhan-vien-list/thong-tin-loai-nhan-vien-list.component";
import { EmployeeInfoListComponent } from "./HRM_module/employee/employee-info/employee-info-list/employee-info-list.component";

const routes: Routes = [
  { path: 'thong-tin-phong-ban', component: ThongTinPhongBanListComponent, data: { table_name: "10.05.01_Department", url_voucher_form_edit: undefined } },
  { path: 'thong-tin-vi-tri-nhan-su', component: ViTriNhanSuListComponent, data: { table_name: "10.05.02_Position", url_voucher_form_edit: undefined } },
  { path: 'trang-thai-cua-nhan-vien', component: ThongTinTrangThaiNhanVienListComponent, data: { table_name: "10.05.03_StatusEmployee", url_voucher_form_edit: undefined } },
  { path: 'phan-loai-nhan-vien', component: ThongTinLoaiNhanVienListComponent, data: { table_name: "10.05.04_TypeEmployee", url_voucher_form_edit: undefined } },
  { path: 'phan-loai-cong-viec', component: ThongTinLoaiCongViecListComponent, data: { table_name: "10.05.05_TypeWork", url_voucher_form_edit: undefined } },
  { path: 'employee-info', component: EmployeeInfoListComponent, data: { table_name: "10.01.01_EmployeeInfo", url_voucher_form_edit: undefined } },
];

export default routes;

// 10.05.04_TypeEmployee

// 10.05.05_TypeWork