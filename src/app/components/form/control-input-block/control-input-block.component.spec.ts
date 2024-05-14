import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlInputBlockComponent } from './control-input-block.component';

describe('ControlInputBlockComponent', () => {
  let component: ControlInputBlockComponent;
  let fixture: ComponentFixture<ControlInputBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlInputBlockComponent]
    });
    fixture = TestBed.createComponent(ControlInputBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
