import { TestBed } from '@angular/core/testing';

import { MiahootService } from './miahoot.service';

describe('MiahootService', () => {
  let service: MiahootService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiahootService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
