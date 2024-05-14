import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPageMenuComponent } from './list-page-menu.component';

describe('ListPageMenuComponent', () => {
  let component: ListPageMenuComponent;
  let fixture: ComponentFixture<ListPageMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListPageMenuComponent]
    });
    fixture = TestBed.createComponent(ListPageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
