import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormColumnSettingsEditComponent } from './VoucherFormColumnSettingsEditComponent';

describe('VoucherFormColumnSettingsEditComponent', () => {
  let component: VoucherFormColumnSettingsEditComponent;
  let fixture: ComponentFixture<VoucherFormColumnSettingsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormColumnSettingsEditComponent]
    });
    fixture = TestBed.createComponent(VoucherFormColumnSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
