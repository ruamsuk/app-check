import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AppService } from '../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent {
  ngForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional()
    private service: AppService,
    private dialogRef: MatDialogRef<AddDataComponent>,
    private fb: FormBuilder,
    private toast: HotToastService
  ) {
    this.ngForm = new FormGroup<any>({
      id: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }

  onSubmit() {
    if (this.ngForm.invalid) return;

    const data = this.ngForm.value;

    this.service.addUser(data).pipe(
      this.toast.observe({
        loading: 'Now loading...',
        success: 'Add data successfully',
        error: ({message}) => `${message}`
      })
    ).subscribe(() => this.closeDialog());
  }

  closeDialog() {
    this.ngForm.reset();
    this.dialogRef.close();
  }
}
