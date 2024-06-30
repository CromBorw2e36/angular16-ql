import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinLoaiCongViecListComponent } from './thong-tin-loai-cong-viec-list.component';

describe('ThongTinLoaiCongViecListComponent', () => {
  let component: ThongTinLoaiCongViecListComponent;
  let fixture: ComponentFixture<ThongTinLoaiCongViecListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThongTinLoaiCongViecListComponent]
    });
    fixture = TestBed.createComponent(ThongTinLoaiCongViecListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
