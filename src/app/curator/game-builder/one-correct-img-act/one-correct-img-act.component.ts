import { Component, OnInit, Input } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-one-correct-img-act',
  templateUrl: './one-correct-img-act.component.html',
  styleUrls: ['./one-correct-img-act.component.css']
})
export class OneCorrectImgActComponent implements OnInit {

  @Input() activity = null
  timeFormControl = new FormControl();

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (!this.activity.content){
      this.activity.content = {
        questions: []
      }
    } else {
    }
    if (!this.activity.config){
      this.activity.config = {
        time: 0,
      }
    } else {
      if (this.activity.config.time) {
        this.timeFormControl.setValue(this.activity.config.time)
      }
    }
    this.timeFormControl.valueChanges.subscribe((changedVal) => {
      this.activity.config.time = changedVal
    })
  }

  add() {
    this.activity.content.questions = this.activity.content.questions.concat({
      question: "",
      correct: {
        img: null,
        text: "",
      },
      wrong: {
        img: null,
        text: "",
      },
      explanation: ""
    })
  }
  remove(index) {
    this.activity.content.questions.splice(index, 1);
  }
}
