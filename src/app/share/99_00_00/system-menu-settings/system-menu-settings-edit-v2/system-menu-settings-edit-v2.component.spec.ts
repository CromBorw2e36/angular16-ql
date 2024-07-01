import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMenuSettingsEditV2Component } from './system-menu-settings-edit-v2.component';

describe('SystemMenuSettingsEditV2Component', () => {
  let component: SystemMenuSettingsEditV2Component;
  let fixture: ComponentFixture<SystemMenuSettingsEditV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMenuSettingsEditV2Component]
    });
    fixture = TestBed.createComponent(SystemMenuSettingsEditV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
