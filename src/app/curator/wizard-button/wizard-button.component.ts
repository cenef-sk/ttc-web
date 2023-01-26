import { Component, OnInit, Input } from '@angular/core';
import { DialogWizardComponent } from "src/app/dialogs/dialog-wizard/dialog-wizard.component";
import { SmartStoryEngine } from 'smartstoryengine/dist/app/SmartStoryEngine';
import { MatDialog } from "@angular/material";


@Component({
  selector: 'app-wizard-button',
  templateUrl: './wizard-button.component.html',
  styleUrls: ['./wizard-button.component.css']
})
export class WizardButtonComponent implements OnInit {

  @Input() wizardType: string;

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
  }

  openWizard() {
    this.dialog.open(DialogWizardComponent, {
      width: '500px',
      height: '300px',
      data: {
        wizardType: this.wizardType,
        finalize: (engine: SmartStoryEngine) => {
          console.log("WIZARD DONE")
        }
      }
      });
  }
}
