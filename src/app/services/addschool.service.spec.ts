import { TestBed } from '@angular/core/testing';

import { AddschoolService } from './addschool.service';

describe('AddschoolService', () => {
  let service: AddschoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddschoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
