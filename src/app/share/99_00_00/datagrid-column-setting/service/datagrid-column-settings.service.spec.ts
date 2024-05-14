import { TestBed } from '@angular/core/testing';

import { DatagridColumnSettingsService } from './datagrid-column-settings.service';

describe('DatagridColumnSettingsService', () => {
  let service: DatagridColumnSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatagridColumnSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
