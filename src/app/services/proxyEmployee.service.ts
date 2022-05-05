import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class ProxyEmployeeService {

  private baseURL: String;

  constructor(private httpClient: HttpClient) {
    this.baseURL = "http://localhost:8080/api/v1/employees";
  }

  getAllEmployees$(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.baseURL}`);
  }

  createEmployee$(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.baseURL}`, employee);
  }

  getEmployeeById$(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${this.baseURL}/${id}`);
  }

  updateEmployee$(id: number, employee: Employee): Observable<Employee> {
    return this.httpClient.put<Employee>(`${this.baseURL}/${id}`, employee);
  }

  deleteEmployee$(id: number): Observable<Employee> {
    return this.httpClient.delete<Employee>(`${this.baseURL}/${id}`);
  }
}
