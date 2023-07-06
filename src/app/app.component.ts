import { Component, Optional } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { AddDataComponent } from './add-data/add-data.component';
import { AppService } from './services/app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-check';
  dataList: any[] = [];

  constructor(
    @Optional()
    private dialog: MatDialog,
    private service: AppService,
    private toast: HotToastService
  ) {
    // this.loadData();
  }

  loadData() {
    this.service.loadUsers().pipe(
      untilDestroyed(this),
      this.toast.observe({
        loading: 'Now loading...',
        success: 'Loaded successfully',
        error: ({message}) => `${message}`
      })
    ).subscribe({
      next: value => {
        this.dataList = value
        console.log(value)
      },
      error: err => { console.log(err.message)}
    })
  }

  logout() {
    this.dialog.open(AddDataComponent, {});
  }
}
