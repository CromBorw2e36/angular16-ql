import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAndLanguageEditComponent } from './national-and-language-edit.component';

describe('NationalAndLanguageEditComponent', () => {
  let component: NationalAndLanguageEditComponent;
  let fixture: ComponentFixture<NationalAndLanguageEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationalAndLanguageEditComponent]
    });
    fixture = TestBed.createComponent(NationalAndLanguageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
