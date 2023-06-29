import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";

import wizard_sk from "src/wizard/wizard_sk.json";
import wizard_cz from "src/wizard/wizard_cz.json";
import wizard_pl from "src/wizard/wizard_pl.json";
import wizard_en from "src/wizard/wizard_en.json";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-dialog-wizard',
  templateUrl: './dialog-wizard.component.html',
  styleUrls: ['./dialog-wizard.component.css']
})
export class DialogWizardComponent implements OnInit {

  title = ""
  message = ""
  input = false;
  page = 0
  wizData: any = []

//translate!
  constructor(@Inject (MAT_DIALOG_DATA) public data: {
    wizardType: string,
    finalize: any
  },
  public dialogRef: MatDialogRef<DialogWizardComponent>,
  private translate: TranslateService,
) {
    let lng = this.translate.currentLang;
    let wiz = wizard_sk;
    if (lng) {
      if (lng == "CZ") {
        wiz = wizard_cz
      }
      if (lng == "PL") {
        wiz = wizard_pl
      }
      if (lng == "EN") {
        wiz = wizard_en
      }
    }
    if(wiz[data.wizardType]) {
      this.wizData = wiz[data.wizardType]
    } else {
      this.wizData = wiz["no_wizard"]
    }
  }

  ngOnInit() {
    this.wizard()
  }

  wizard () {
    this.page = 0
    this.renderPage()
  }

  onAnswer() {
    this.page +=1
    if (this.wizData.steps.length > this.page) {
      this.renderPage()
    } else {
      this.dialogRef.close()
    }
    //   this.data.finalize(this.engine);
  }

  renderPage() {
    this.title = this.wizData.title
    if (this.wizData.steps.length > 1) {
      this.title = this.title + " " + (this.page+1) + "/" + this.wizData.steps.length;
    }
    this.message = this.wizData.steps[this.page]
  }
}
