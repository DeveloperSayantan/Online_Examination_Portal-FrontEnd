import { TestBed } from '@angular/core/testing';

import { AddboardService } from './addboard.service';

describe('AddboardService', () => {
  let service: AddboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
