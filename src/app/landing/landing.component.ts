import { AfterViewInit, Component, Optional, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../services/app.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from '../models/user.model';
import { AddDataComponent } from '../add-data/add-data.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];
  dataSource = new MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  searchKey!: string;
  loading: boolean = false;

  constructor(
    @Optional()
    private dialog: MatDialog,
    private service: AppService,
    private toast: HotToastService
  ) {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.service.loadUsers().pipe(
      this.toast.observe({
        success: 'Successfully',
        loading: 'loading...',
        error: ({message}) => `${message}`
      }),
      untilDestroyed(this)
    ).subscribe({
      next: (data) => {
        // @ts-ignore
        this.dataSource = new MatTableDataSource<User>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onDelete(row: User) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Delete User',
        message: `ลบ: ${row.firstName} ${row.lastName}; แน่ใจ?`
      }
    });
    confirmDialog.afterClosed()
      .subscribe(res => {
        if (res) {
          let id = row.id;
          this.service.deleteUser(id)
            .pipe(
              this.toast.observe({
                loading: 'loading...',
                success: 'Deleted Success',
                error: ({message}) => `${message}`
              })
            ).subscribe()
        }
      });
  }

  onUpdate(data: any) {
    this.dialog.open(AddDataComponent, {data});
  }
}
