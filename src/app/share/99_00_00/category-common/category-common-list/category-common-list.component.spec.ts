import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCommonListComponent } from './category-common-list.component';

describe('CategoryCommonListComponent', () => {
  let component: CategoryCommonListComponent;
  let fixture: ComponentFixture<CategoryCommonListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryCommonListComponent]
    });
    fixture = TestBed.createComponent(CategoryCommonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
