import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAccountEditComponent } from './type-account-edit.component';

describe('TypeAccountEditComponent', () => {
  let component: TypeAccountEditComponent;
  let fixture: ComponentFixture<TypeAccountEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeAccountEditComponent]
    });
    fixture = TestBed.createComponent(TypeAccountEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
