import { Component, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDataComponent } from './add-data/add-data.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Test my-app-check';
  constructor(
    @Optional()
    private dialog: MatDialog,
  ) { }

  logout() {
    this.dialog.open(AddDataComponent, {});
  }
}
