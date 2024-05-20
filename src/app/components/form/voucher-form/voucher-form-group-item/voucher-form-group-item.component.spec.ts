import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormGroupItemComponent } from './voucher-form-group-item.component';

describe('VoucherFormGroupItemComponent', () => {
  let component: VoucherFormGroupItemComponent;
  let fixture: ComponentFixture<VoucherFormGroupItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormGroupItemComponent]
    });
    fixture = TestBed.createComponent(VoucherFormGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
