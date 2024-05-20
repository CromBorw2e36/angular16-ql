import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherFormGroupTabListComponent } from './voucher-form-group-tab-list.component';

describe('VoucherFormGroupTabListComponent', () => {
  let component: VoucherFormGroupTabListComponent;
  let fixture: ComponentFixture<VoucherFormGroupTabListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherFormGroupTabListComponent]
    });
    fixture = TestBed.createComponent(VoucherFormGroupTabListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
