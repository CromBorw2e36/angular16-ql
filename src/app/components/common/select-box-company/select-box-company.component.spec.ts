import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBoxCompanyComponent } from './select-box-company.component';

describe('SelectBoxCompanyComponent', () => {
  let component: SelectBoxCompanyComponent;
  let fixture: ComponentFixture<SelectBoxCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectBoxCompanyComponent]
    });
    fixture = TestBed.createComponent(SelectBoxCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
