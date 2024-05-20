import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormColItemComponent } from './voucher-form-col-item.component';

describe('VoucherFormColItemComponent', () => {
  let component: VoucherFormColItemComponent;
  let fixture: ComponentFixture<VoucherFormColItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormColItemComponent]
    });
    fixture = TestBed.createComponent(VoucherFormColItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
