import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() question = null;
  @Input() index = 0;

  @Output() removeEvent = new EventEmitter<number>();

  questionFormControl = new FormControl();
  explanationFormControl = new FormControl();
  answer1FormControl = new FormControl();
  answer2FormControl = new FormControl();
  answer3FormControl = new FormControl();
  answer4FormControl = new FormControl();

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (this.question) {
      this.questionFormControl.setValue(this.question.question)
      this.explanationFormControl.setValue(this.question.explanation)
      this.answer1FormControl.setValue(this.question.answers[0])
      this.answer2FormControl.setValue(this.question.answers[1])
      this.answer3FormControl.setValue(this.question.answers[2])
      this.answer4FormControl.setValue(this.question.answers[3])
    }

    this.questionFormControl.valueChanges.subscribe((changedVal) => {
      this.question.question = changedVal
    })
    this.explanationFormControl.valueChanges.subscribe((changedVal) => {
      this.question.explanation = changedVal
    })
    this.answer1FormControl.valueChanges.subscribe((changedVal) => {
      this.question.answers[0] = changedVal
    })
    this.answer2FormControl.valueChanges.subscribe((changedVal) => {
      this.question.answers[1] = changedVal
    })
    this.answer3FormControl.valueChanges.subscribe((changedVal) => {
      this.question.answers[2] = changedVal
    })
    this.answer4FormControl.valueChanges.subscribe((changedVal) => {
      this.question.answers[3] = changedVal
    })
  }

  mediaSelection(question) {
    this.dialog.open(DialogMediaComponent, {
      width: '800px',
      height: '400px',
      data: {
        finalize: (asset) => {
          question.img = asset._id
        }
      }
      });
  }

  mediaUrl(assetId) {
    return this.contentService.API + 'assets/' + assetId + '/media'
  }
  remove(index) {
    this.removeEvent.emit(index);
  }

  removeMedia() {
    this.question.img = null
  }
}
