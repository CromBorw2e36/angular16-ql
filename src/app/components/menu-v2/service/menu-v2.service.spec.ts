import { TestBed } from '@angular/core/testing';

import { MenuV2Service } from './menu-v2.service';

describe('MenuV2Service', () => {
  let service: MenuV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
