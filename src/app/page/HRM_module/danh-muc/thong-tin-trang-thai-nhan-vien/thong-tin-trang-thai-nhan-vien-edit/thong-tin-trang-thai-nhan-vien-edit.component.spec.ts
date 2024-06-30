import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinTrangThaiNhanVienEditComponent } from './thong-tin-trang-thai-nhan-vien-edit.component';

describe('ThongTinTrangThaiNhanVienEditComponent', () => {
  let component: ThongTinTrangThaiNhanVienEditComponent;
  let fixture: ComponentFixture<ThongTinTrangThaiNhanVienEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinTrangThaiNhanVienEditComponent]
    });
    fixture = TestBed.createComponent(ThongTinTrangThaiNhanVienEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
