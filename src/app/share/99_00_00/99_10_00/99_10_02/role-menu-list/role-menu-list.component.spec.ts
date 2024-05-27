import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleMenuListComponent } from './role-menu-list.component';

describe('RoleMenuListComponent', () => {
  let component: RoleMenuListComponent;
  let fixture: ComponentFixture<RoleMenuListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleMenuListComponent]
    });
    fixture = TestBed.createComponent(RoleMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
