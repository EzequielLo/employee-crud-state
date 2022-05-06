import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../model/employee';
import { EmployeeDTO } from '../model/employee-dto';
import { ProxyEmployeeService } from './proxyEmployee.service';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private proxy: ProxyEmployeeService) { }

  getEmployees(): Observable<Employee[]> {

    return this.proxy.getAllEmployees$().pipe(
      map(employeeDTO => {
        let employees: Employee[] = [];
        employeeDTO.map(employeeDTO => {
          employees = [...employees, this.adaptDTOToModel(employeeDTO)];
        });

        return employees;
      })
    );
  }

  getEmployee(employeeId: number): Observable<Employee> {

    return this.proxy.getEmployeeById$(employeeId).pipe(
      map(employeeDTO => this.adaptDTOToModel(employeeDTO))
    );
  }

  createEmployee(employee: Employee): Observable<Employee> {

    return this.proxy.createEmployee$(employee);
  }

  deleteEmployee(employeeId: number): Observable<Employee> {

    return this.proxy.deleteEmployee$(employeeId).pipe(
      map(employeeDTO => this.adaptDTOToModel(employeeDTO))
    );

  }

  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {

    return this.proxy.updateEmployee$(employeeId, this.adaptModelTODTO(employee)).pipe(
      map(employeeDTO => this.adaptDTOToModel(employeeDTO))
    );
  }

  private adaptDTOToModel(employeeDTO: EmployeeDTO): Employee {

    return {
      id: employeeDTO.id,
      firstName: employeeDTO.firstName,
      lastName: employeeDTO.lastName,
      emailId: employeeDTO.emailId
    };
  }

  private adaptModelTODTO(employee: Employee): EmployeeDTO {

    return {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      emailId: employee.emailId
    };
  }

}
