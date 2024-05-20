import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCommonEditComponent } from './category-common-edit.component';

describe('CategoryCommonEditComponent', () => {
  let component: CategoryCommonEditComponent;
  let fixture: ComponentFixture<CategoryCommonEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryCommonEditComponent]
    });
    fixture = TestBed.createComponent(CategoryCommonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
