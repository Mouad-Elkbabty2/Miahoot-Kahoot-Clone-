import { TestBed } from '@angular/core/testing';

import { PresentateurService } from './presentateur.service';

describe('PresentateurService', () => {
  let service: PresentateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresentateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
