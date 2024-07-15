import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoFilterComponent } from './employee-info-filter.component';

describe('EmployeeInfoFilterComponent', () => {
  let component: EmployeeInfoFilterComponent;
  let fixture: ComponentFixture<EmployeeInfoFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeInfoFilterComponent]
    });
    fixture = TestBed.createComponent(EmployeeInfoFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
