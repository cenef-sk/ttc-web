import { Component, OnInit, Input } from '@angular/core';
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { ContentService } from "src/app/content.service";
import { MatDialog } from "@angular/material";
import { Globals } from "src/app/globals";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-quiz-act',
  templateUrl: './quiz-act.component.html',
  styleUrls: ['./quiz-act.component.css']
})
export class QuizActComponent implements OnInit {

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
      img: null,
      answers: ["", "", "", ""], //prva je správna
      explanation: ""
    })
  }
  remove(index) {
    this.activity.content.questions.splice(index, 1);
  }    
}
