import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormGroupTabEditComponent } from './voucher-form-group-tab-edit.component';

describe('VoucherFormGroupTabEditComponent', () => {
  let component: VoucherFormGroupTabEditComponent;
  let fixture: ComponentFixture<VoucherFormGroupTabEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormGroupTabEditComponent]
    });
    fixture = TestBed.createComponent(VoucherFormGroupTabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
