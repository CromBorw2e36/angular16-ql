import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListManagermentListComponent } from './company-list-managerment-list.component';

describe('CompanyListManagermentListComponent', () => {
  let component: CompanyListManagermentListComponent;
  let fixture: ComponentFixture<CompanyListManagermentListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyListManagermentListComponent]
    });
    fixture = TestBed.createComponent(CompanyListManagermentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
