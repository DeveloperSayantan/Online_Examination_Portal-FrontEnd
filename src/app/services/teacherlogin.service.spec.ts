import { TestBed } from '@angular/core/testing';

import { TeacherloginService } from './teacherlogin.service';

describe('TeacherloginService', () => {
  let service: TeacherloginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherloginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
