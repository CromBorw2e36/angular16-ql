import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormColumnSettingsListComponent } from './voucher-form-column-settings-list.component';

describe('VoucherFormColumnSettingsListComponent', () => {
  let component: VoucherFormColumnSettingsListComponent;
  let fixture: ComponentFixture<VoucherFormColumnSettingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormColumnSettingsListComponent]
    });
    fixture = TestBed.createComponent(VoucherFormColumnSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
