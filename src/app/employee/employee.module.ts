import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { MarterialModule } from '../shared/material.module';
import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './page/home/home.component';


@NgModule({
  declarations: [TableComponent, FormComponent, HomeComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MarterialModule,
    ReactiveFormsModule
  ]
})
export class EmployeeModule { }
