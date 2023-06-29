import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";

@Component({
  selector: 'app-open-question-item',
  templateUrl: './open-question-item.component.html',
  styleUrls: ['./open-question-item.component.css']
})
export class OpenQuestionItemComponent implements OnInit {
  @Input() question = null;
  @Input() index = 0;

  @Output() removeEvent = new EventEmitter<number>();

  questionFormControl = new FormControl();
  explanationFormControl = new FormControl();

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (this.question) {
      this.questionFormControl.setValue(this.question.question)
      this.explanationFormControl.setValue(this.question.explanation)
    }

    this.questionFormControl.valueChanges.subscribe((changedVal) => {
      this.question.question = changedVal
    })
    this.explanationFormControl.valueChanges.subscribe((changedVal) => {
      this.question.explanation = changedVal
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
