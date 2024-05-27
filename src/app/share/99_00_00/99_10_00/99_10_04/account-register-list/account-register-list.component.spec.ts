import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRegisterListComponent } from './account-register-list.component';

describe('AccountRegisterListComponent', () => {
  let component: AccountRegisterListComponent;
  let fixture: ComponentFixture<AccountRegisterListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRegisterListComponent]
    });
    fixture = TestBed.createComponent(AccountRegisterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
