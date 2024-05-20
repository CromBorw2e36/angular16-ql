import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormGroupTabSettingEditComponent } from './voucher-form-group-tab-setting-edit.component';

describe('VoucherFormGroupTabSettingEditComponent', () => {
  let component: VoucherFormGroupTabSettingEditComponent;
  let fixture: ComponentFixture<VoucherFormGroupTabSettingEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormGroupTabSettingEditComponent]
    });
    fixture = TestBed.createComponent(VoucherFormGroupTabSettingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
