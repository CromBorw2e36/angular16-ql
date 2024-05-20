import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMenuSettingsEditComponent } from './system-menu-settings-edit.component';

describe('SystemMenuSettingsEditComponent', () => {
  let component: SystemMenuSettingsEditComponent;
  let fixture: ComponentFixture<SystemMenuSettingsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMenuSettingsEditComponent]
    });
    fixture = TestBed.createComponent(SystemMenuSettingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
