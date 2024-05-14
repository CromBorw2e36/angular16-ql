import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberBoxComponent } from './number-box.component';

describe('NumberBoxComponent', () => {
  let component: NumberBoxComponent;
  let fixture: ComponentFixture<NumberBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberBoxComponent]
    });
    fixture = TestBed.createComponent(NumberBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
