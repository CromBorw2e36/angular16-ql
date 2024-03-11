import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextBoxDevextremeComponent } from './text-box-devextreme.component';

describe('TextBoxDevextremeComponent', () => {
  let component: TextBoxDevextremeComponent;
  let fixture: ComponentFixture<TextBoxDevextremeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TextBoxDevextremeComponent]
    });
    fixture = TestBed.createComponent(TextBoxDevextremeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
