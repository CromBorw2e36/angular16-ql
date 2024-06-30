import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinLoaiNhanVienListComponent } from './thong-tin-loai-nhan-vien-list.component';

describe('ThongTinLoaiNhanVienListComponent', () => {
  let component: ThongTinLoaiNhanVienListComponent;
  let fixture: ComponentFixture<ThongTinLoaiNhanVienListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinLoaiNhanVienListComponent]
    });
    fixture = TestBed.createComponent(ThongTinLoaiNhanVienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
