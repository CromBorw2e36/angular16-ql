import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAccountListComponent } from './type-account-list.component';

describe('TypeAccountListComponent', () => {
  let component: TypeAccountListComponent;
  let fixture: ComponentFixture<TypeAccountListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeAccountListComponent]
    });
    fixture = TestBed.createComponent(TypeAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
