import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridColumnSettingListComponent } from './datagrid-column-setting-list.component';

describe('DatagridColumnSettingListComponent', () => {
  let component: DatagridColumnSettingListComponent;
  let fixture: ComponentFixture<DatagridColumnSettingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatagridColumnSettingListComponent]
    });
    fixture = TestBed.createComponent(DatagridColumnSettingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
