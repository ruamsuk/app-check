import { AfterViewInit, Component, Optional, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../services/app.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { User } from '../models/user.model';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'actions'];
  dataSource = new  MatTableDataSource<User>;

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
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
