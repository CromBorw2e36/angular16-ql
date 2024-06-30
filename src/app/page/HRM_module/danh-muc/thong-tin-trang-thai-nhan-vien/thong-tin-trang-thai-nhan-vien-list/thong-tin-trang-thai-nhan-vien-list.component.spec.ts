import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinTrangThaiNhanVienListComponent } from './thong-tin-trang-thai-nhan-vien-list.component';

describe('ThongTinTrangThaiNhanVienListComponent', () => {
  let component: ThongTinTrangThaiNhanVienListComponent;
  let fixture: ComponentFixture<ThongTinTrangThaiNhanVienListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinTrangThaiNhanVienListComponent]
    });
    fixture = TestBed.createComponent(ThongTinTrangThaiNhanVienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
