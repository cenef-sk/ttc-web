import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";

@Component({
  selector: 'app-open-question',
  templateUrl: './open-question.component.html',
  styleUrls: ['./open-question.component.css']
})
export class OpenQuestionComponent implements OnInit {
  @Input() activity = null

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService,
  ) {
  }

  ngOnInit() {
    if (!this.activity.content){
      this.activity.content = {
        questions: []
      }
    } else {
    }
    if (!this.activity.config){
      this.activity.config = {
        time: 0
      }
    } else {
    }
  }

  add() {
    this.activity.content.questions = this.activity.content.questions.concat({
      question: "",
      img: null,
      explanation: ""
    })
  }
}
