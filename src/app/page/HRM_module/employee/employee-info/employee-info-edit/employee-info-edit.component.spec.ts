import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoEditComponent } from './employee-info-edit.component';

describe('EmployeeInfoEditComponent', () => {
  let component: EmployeeInfoEditComponent;
  let fixture: ComponentFixture<EmployeeInfoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeInfoEditComponent]
    });
    fixture = TestBed.createComponent(EmployeeInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
