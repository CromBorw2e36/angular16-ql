import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuPopupComponent } from './role-menu-popup.component';

describe('RoleMenuPopupComponent', () => {
  let component: RoleMenuPopupComponent;
  let fixture: ComponentFixture<RoleMenuPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleMenuPopupComponent]
    });
    fixture = TestBed.createComponent(RoleMenuPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
