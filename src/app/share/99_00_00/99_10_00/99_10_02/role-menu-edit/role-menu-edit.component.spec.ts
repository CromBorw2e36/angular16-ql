import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuEditComponent } from './role-menu-edit.component';

describe('RoleMenuEditComponent', () => {
  let component: RoleMenuEditComponent;
  let fixture: ComponentFixture<RoleMenuEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleMenuEditComponent]
    });
    fixture = TestBed.createComponent(RoleMenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
