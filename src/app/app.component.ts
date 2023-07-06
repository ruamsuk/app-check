import { Component, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDataComponent } from './add-data/add-data.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Test my-app-check';
  constructor(
    @Optional()
    public auth: AuthService,
    private dialog: MatDialog,
  ) { }

  logout() {
    this.dialog.open(AddDataComponent, {});
  }
}
