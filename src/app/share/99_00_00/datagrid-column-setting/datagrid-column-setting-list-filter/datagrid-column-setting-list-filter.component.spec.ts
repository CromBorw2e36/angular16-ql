import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridColumnSettingListFilterComponent } from './datagrid-column-setting-list-filter.component';

describe('DatagridColumnSettingListFilterComponent', () => {
  let component: DatagridColumnSettingListFilterComponent;
  let fixture: ComponentFixture<DatagridColumnSettingListFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatagridColumnSettingListFilterComponent]
    });
    fixture = TestBed.createComponent(DatagridColumnSettingListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
