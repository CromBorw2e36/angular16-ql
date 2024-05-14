import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuV2Component } from './menu-v2.component';

describe('MenuV2Component', () => {
  let component: MenuV2Component;
  let fixture: ComponentFixture<MenuV2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuV2Component]
    });
    fixture = TestBed.createComponent(MenuV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
