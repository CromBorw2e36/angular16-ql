import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormColumnSettingsEditV2Component } from './voucher-form-column-settings-edit-v2.component';

describe('VoucherFormColumnSettingsEditV2Component', () => {
  let component: VoucherFormColumnSettingsEditV2Component;
  let fixture: ComponentFixture<VoucherFormColumnSettingsEditV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormColumnSettingsEditV2Component]
    });
    fixture = TestBed.createComponent(VoucherFormColumnSettingsEditV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
