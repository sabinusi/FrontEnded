import { TestBed, inject } from '@angular/core/testing';

import { CordinatorService } from './cordinator.service';

describe('CordinatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CordinatorService]
    });
  });

  it('should be created', inject([CordinatorService], (service: CordinatorService) => {
    expect(service).toBeTruthy();
  }));
});
