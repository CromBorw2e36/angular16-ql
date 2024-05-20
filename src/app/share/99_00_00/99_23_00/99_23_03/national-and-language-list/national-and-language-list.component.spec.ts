import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAndLanguageListComponent } from './national-and-language-list.component';

describe('NationalAndLanguageListComponent', () => {
  let component: NationalAndLanguageListComponent;
  let fixture: ComponentFixture<NationalAndLanguageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationalAndLanguageListComponent]
    });
    fixture = TestBed.createComponent(NationalAndLanguageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
