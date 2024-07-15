import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeInfoListComponent } from './employee-info-list.component';

describe('EmployeeInfoListComponent', () => {
  let component: EmployeeInfoListComponent;
  let fixture: ComponentFixture<EmployeeInfoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeInfoListComponent]
    });
    fixture = TestBed.createComponent(EmployeeInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
