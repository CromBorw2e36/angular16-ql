import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlTaiKhoanComponent } from './ql-tai-khoan.component';

describe('QlTaiKhoanComponent', () => {
  let component: QlTaiKhoanComponent;
  let fixture: ComponentFixture<QlTaiKhoanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QlTaiKhoanComponent]
    });
    fixture = TestBed.createComponent(QlTaiKhoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
