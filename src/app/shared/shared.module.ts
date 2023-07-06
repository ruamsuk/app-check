import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThaiDatePipe } from '../pipe/thai-date.pipe';
import { ThaiDatepickerModule } from '../thai-datepicker/thai-datepicker.module';
import { MatTableResponsiveModule } from '../mat-table-responsive/mat-table-responsive.module';



@NgModule({
  declarations: [
    ThaiDatePipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ThaiDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableResponsiveModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    ThaiDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    ThaiDatePipe,
    MatTableResponsiveModule
  ]
})
export class SharedModule { }
