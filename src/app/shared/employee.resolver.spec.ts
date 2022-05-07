import { TestBed } from '@angular/core/testing';

import { EmployeeResolve } from './employee.resolver';

describe('EmployeeResolveResolver', () => {
  let resolver: EmployeeResolve;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EmployeeResolve);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
