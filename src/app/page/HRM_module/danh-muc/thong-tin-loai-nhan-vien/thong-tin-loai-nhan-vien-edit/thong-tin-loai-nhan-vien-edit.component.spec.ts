import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinLoaiNhanVienEditComponent } from './thong-tin-loai-nhan-vien-edit.component';

describe('ThongTinLoaiNhanVienEditComponent', () => {
  let component: ThongTinLoaiNhanVienEditComponent;
  let fixture: ComponentFixture<ThongTinLoaiNhanVienEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinLoaiNhanVienEditComponent]
    });
    fixture = TestBed.createComponent(ThongTinLoaiNhanVienEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
