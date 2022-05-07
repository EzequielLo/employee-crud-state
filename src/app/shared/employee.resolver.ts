import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Employee } from '../model/employee';
import { StoreEmployeeService } from '../services/store-employee.service';

@Injectable()

export class EmployeeResolve implements Resolve<Employee> {
  constructor(private storeService: StoreEmployeeService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.storeService.findemployee(Number(route.paramMap.get("id")));
  }
}
