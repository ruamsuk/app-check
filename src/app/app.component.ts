import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDataComponent } from './add-data/add-data.component';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AppService } from './services/app.service';
import { UntilDestroy } from '@ngneat/until-destroy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Test my-app-check';
  constructor(
    @Optional()
    public auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() { }

  logout() {
    this.dialog.open(AddDataComponent, {});
  }

  _logout() {
    this.auth.logout()
      .subscribe(() => {
        this.router.navigate(['/']).finally();
      })
  }
}
