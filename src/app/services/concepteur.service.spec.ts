import { TestBed } from '@angular/core/testing';

import { ConcepteurService } from './concepteur.service';

describe('ConcepteurService', () => {
  let service: ConcepteurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcepteurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
