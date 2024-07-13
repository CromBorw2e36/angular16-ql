import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListManagermentEditComponent } from './company-list-managerment-edit.component';

describe('CompanyListManagermentEditComponent', () => {
  let component: CompanyListManagermentEditComponent;
  let fixture: ComponentFixture<CompanyListManagermentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyListManagermentEditComponent]
    });
    fixture = TestBed.createComponent(CompanyListManagermentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
