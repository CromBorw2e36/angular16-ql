import { TestBed } from '@angular/core/testing';

import { ConfigServerService } from './config-server.service';

describe('ConfigServerService', () => {
  let service: ConfigServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
