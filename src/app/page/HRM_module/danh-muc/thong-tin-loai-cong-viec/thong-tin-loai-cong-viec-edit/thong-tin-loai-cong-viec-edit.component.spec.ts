import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinLoaiCongViecEditComponent } from './thong-tin-loai-cong-viec-edit.component';

describe('ThongTinLoaiCongViecEditComponent', () => {
  let component: ThongTinLoaiCongViecEditComponent;
  let fixture: ComponentFixture<ThongTinLoaiCongViecEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinLoaiCongViecEditComponent]
    });
    fixture = TestBed.createComponent(ThongTinLoaiCongViecEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
