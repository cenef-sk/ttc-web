import { Component, OnInit, Input } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.css']
})
export class PoiComponent implements OnInit {
  @Input() poi = null;
  @Input() index = 0;


  explanationFormControl = new FormControl();
  questionFormControl = new FormControl();

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (this.poi) {
      this.explanationFormControl.setValue(this.poi.explanation)
      this.questionFormControl.setValue(this.poi.question)
    }

    this.explanationFormControl.valueChanges.subscribe((changedVal) => {
      this.poi.explanation = changedVal
    })
    this.questionFormControl.valueChanges.subscribe((changedVal) => {
      this.poi.question = changedVal
    })
  }
}
