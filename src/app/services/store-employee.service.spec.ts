import { TestBed } from '@angular/core/testing';

import { StoreEmployeeService } from './store-employee.service';

describe('StoreEmployeeService', () => {
  let service: StoreEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
