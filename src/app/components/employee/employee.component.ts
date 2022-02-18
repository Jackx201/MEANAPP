import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService : EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employeesArray = res;
      },
      err => console.log(err)
    )
  }

  resetForm(form: NgForm){
    form.reset();
  }

  addEmployee(form: NgForm){
    if(form.value._id){
      this.employeeService.updateEmployee(form.value).subscribe(
        res => {
          console.log(res);
          this.resetForm(form);
          this.getEmployees();
        },  
        err => {
          console.error(err);
        },  
      );

    } else {
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          this.getEmployees();
          form.reset()
        },  
        err => {
          this.getEmployees();
          form.reset()
        },  
      );
    }
  }

  deleteEmployee(_id: string){
    if (confirm('Are you sure you want to delete this employee?')){
      this.employeeService.deleteEmployee(_id)
      .subscribe(res => {this.getEmployees();}, err => console.error(err))
    }
  }

  editEmployee(employee: Employee){
    this.employeeService.selectedEmployee = employee;
  }
}
