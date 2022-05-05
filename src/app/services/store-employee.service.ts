import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { Store } from '../store/store';
import { EmployeeService } from './employee.service';


@Injectable({
  providedIn: 'root'
})

export class StoreEmployeeService extends Store<Employee[]> {

  constructor(private service: EmployeeService) {
    super();
  }

  async init() {
    if (this.get()) { return }
    return await lastValueFrom(this.service.getEmployees().pipe(
      tap(this.store)
    ))
  }

  async findemployee(employeeId: number): Promise<Employee> {
    return await lastValueFrom(this.service.getEmployee(employeeId).pipe(
      tap(() => {
        const employees = this.get();
        return employees.filter(employee => employee.id !== employeeId);
      })
    ))
  }

  async create(employee: Employee): Promise<Employee> {
    return await lastValueFrom(this.service.createEmployee(employee).pipe(
      tap(employeeResult => {
        this.store([employeeResult, ...this.get()]);
      })
    ))
  }

  async update(employeeId: number, employee: Employee): Promise<Employee> {
    return await lastValueFrom(this.service.updateEmployee(employeeId, employee).pipe(
      tap(() => {
        const employees = this.get();
        const p = Object.assign({}, employee);
        const index = this.searchIndex(employees, employeeId);
        const newEmployees = [...employees.slice(0, index), p, ...employees.slice(index + 1)];
        this.store(newEmployees);
      })
    ))
  }

  async delete(employeeId: number): Promise<Employee> {
    return await lastValueFrom(this.service.deleteEmployee(employeeId).pipe(
      tap(() => {
        const employees = this.get();
        const newEmployees = employees.filter(employee => employee.id !== employeeId);
        this.store(newEmployees);
      })
    ))
  }

  private searchIndex(employees: Employee[], employeeId: number): number {
    return employees.findIndex(item => item.id === employeeId);
  }
}
