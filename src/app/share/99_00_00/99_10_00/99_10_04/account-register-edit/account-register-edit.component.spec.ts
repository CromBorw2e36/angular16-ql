import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegisterEditComponent } from './account-register-edit.component';

describe('AccountRegisterEditComponent', () => {
  let component: AccountRegisterEditComponent;
  let fixture: ComponentFixture<AccountRegisterEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRegisterEditComponent]
    });
    fixture = TestBed.createComponent(AccountRegisterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
