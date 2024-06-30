import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViTriNhanSuListComponent } from './vi-tri-nhan-su-list.component';

describe('ViTriNhanSuListComponent', () => {
  let component: ViTriNhanSuListComponent;
  let fixture: ComponentFixture<ViTriNhanSuListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViTriNhanSuListComponent]
    });
    fixture = TestBed.createComponent(ViTriNhanSuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
