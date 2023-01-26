import { Component, OnInit, Input } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-memory-act',
  templateUrl: './memory-act.component.html',
  styleUrls: ['./memory-act.component.css']
})
export class MemoryActComponent implements OnInit {

  @Input() activity = null

  timeFormControl = new FormControl();
  maxTriesFormControl = new FormControl();

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (!this.activity.content){
      this.activity.content = {
        pairs: []
      }
    } else {
    }
    if (!this.activity.config){
      this.activity.config = {
        time: 0,
        maxTries: 0,
      }
    } else {
      if (this.activity.config.time) {
        this.timeFormControl.setValue(this.activity.config.time)
      }
      if (this.activity.config.maxTries) {
        this.maxTriesFormControl.setValue(this.activity.config.maxTries)
      }
    }
    this.timeFormControl.valueChanges.subscribe((changedVal) => {
      this.activity.config.time = changedVal
    })
    this.maxTriesFormControl.valueChanges.subscribe((changedVal) => {
      this.activity.config.maxTries = changedVal
    })
  }

  add() {
    this.activity.content.pairs = this.activity.content.pairs.concat({
      item1: {
        img: null,
        text: ""
      },
      item2: {
        img: null,
        text: ""
      },
      explanation: ""
    })
  }
}
