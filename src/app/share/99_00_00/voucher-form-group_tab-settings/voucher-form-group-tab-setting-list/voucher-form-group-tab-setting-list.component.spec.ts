import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormGroupTabSettingListComponent } from './voucher-form-group-tab-setting-list.component';

describe('VoucherFormGroupTabSettingListComponent', () => {
  let component: VoucherFormGroupTabSettingListComponent;
  let fixture: ComponentFixture<VoucherFormGroupTabSettingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormGroupTabSettingListComponent]
    });
    fixture = TestBed.createComponent(VoucherFormGroupTabSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
