import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, } from '@angular/forms';
import { StoreEmployeeService } from 'src/app/services/store-employee.service';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

  employee!: Employee;
  formEmployee = this.fb.group({
    firstName: [[""], [Validators.pattern(/[a-z]{1,20}/g)]],
    lastName: [[""], [Validators.pattern(/[a-z]{1,20}/g)]],
    emailId: [[""], [Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g)]],
  });
  action = '';

  constructor(
    private store: StoreEmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }


  ngOnInit(): void {
    if (this.router.url.includes("edit")) {
      this.employee = this.route.snapshot.data['employee'];
      this.formEmployee.get('firstName')!.setValue(this.employee.firstName);
      this.formEmployee.get('lastName')!.setValue(this.employee.lastName);
      this.formEmployee.get('emailId')!.setValue(this.employee.emailId);
      this.action = 'update';
    }
  }



  async onCreate() {
    await this.store.create(this.formEmployee.value);
    this.goToEmployeeList();
  }

  async onUpdate() {
    const id = this.employee.id;
    const firstName = this.formEmployee.get('firstName')!.value;
    const lastName = this.formEmployee.get('lastName')!.value;
    const emailId = this.formEmployee.get('emailId')!.value;
    const employee = {
      id, firstName, lastName, emailId
    };
    await this.store.update(id, employee);
    this.goToEmployeeList();
  }

  onCancel() {
    this.formEmployee.get('firstName')!.setValue("");
    this.formEmployee.get('lastName')!.setValue("");
    this.formEmployee.get('emailId')!.setValue("");
    this.action = '';
    this.goToEmployeeList();

  }

  goToEmployeeList() {
    this.router.navigate(['employees/data'])

  }
}
