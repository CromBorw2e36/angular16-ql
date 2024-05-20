import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMenuSettingsListComponent } from './system-menu-settings-list.component';

describe('SystemMenuSettingsListComponent', () => {
  let component: SystemMenuSettingsListComponent;
  let fixture: ComponentFixture<SystemMenuSettingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemMenuSettingsListComponent]
    });
    fixture = TestBed.createComponent(SystemMenuSettingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
