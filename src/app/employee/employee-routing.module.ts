import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { HomeComponent } from './page/home/home.component';
import { TableComponent } from './table/table.component';
import { EmployeeResolve } from '../shared/employee.resolver'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'data', component: TableComponent },
      { path: 'add', component: FormComponent },
      {
        path: 'edit/:id', component: FormComponent,
        resolve: {
          employee: EmployeeResolve
        }
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,]
})
export class EmployeeRoutingModule { }
