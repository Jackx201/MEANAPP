import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  URL_API = 'http://192.168.1.14:4000/api/employees';

  selectedEmployee : Employee = {
    name: '',
    position: '',
    office: '',
    salary: 0
  };
  employeesArray !: Employee[];

  getEmployees(){
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee: Employee){
    return this.http.post(this.URL_API, employee);
  }

  updateEmployee(employee: Employee){
    return this.http.put(`${this.URL_API}/${employee._id}`, employee);
  }

  deleteEmployee(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`);
  }
}
