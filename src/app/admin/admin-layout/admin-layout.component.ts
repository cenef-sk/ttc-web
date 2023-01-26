import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogTermsComponent } from '../../dialogs/dialog-terms/dialog-terms.component';
import { DialogAboutComponent } from "src/app/dialogs/dialog-about/dialog-about.component";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

    constructor(
      private router: Router,
      private translate: TranslateService,
      public dialog: MatDialog
    ) { }

    ngOnInit() {
    }

    openDialogTerms() {
      const dialogRef = this.dialog.open(DialogTermsComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openDialogAbout() {
      const dialogRef = this.dialog.open(DialogAboutComponent);

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    enter(){
      this.router.navigate(['/login']);
    }
}
