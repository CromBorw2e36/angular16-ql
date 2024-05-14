import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatagridColumnSettingListEditComponent } from './datagrid-column-setting-list-edit.component';

describe('DatagridColumnSettingListEditComponent', () => {
  let component: DatagridColumnSettingListEditComponent;
  let fixture: ComponentFixture<DatagridColumnSettingListEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatagridColumnSettingListEditComponent]
    });
    fixture = TestBed.createComponent(DatagridColumnSettingListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
