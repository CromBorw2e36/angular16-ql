import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViTriNhanSuEditComponent } from './vi-tri-nhan-su-edit.component';

describe('ViTriNhanSuEditComponent', () => {
  let component: ViTriNhanSuEditComponent;
  let fixture: ComponentFixture<ViTriNhanSuEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViTriNhanSuEditComponent]
    });
    fixture = TestBed.createComponent(ViTriNhanSuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
