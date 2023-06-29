import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { FormControl, Validators } from "@angular/forms";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";

@Component({
  selector: 'app-timeline-act',
  templateUrl: './timeline-act.component.html',
  styleUrls: ['./timeline-act.component.css']
})
export class TimelineActComponent implements OnInit {
  @Input() activity = null
  titleFormControl = new FormControl('', [Validators.required]);
  timeFormControl = new FormControl();
  explanationFormControl = new FormControl();

  constructor(
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (!this.activity.content){
      this.activity.content = {
        task: "",
        items: [null, null, null, null, null],
        explanation: ""
      }
    } else {
      if (this.activity.content.task) {
        this.titleFormControl.setValue(this.activity.content.task)
      }
      if (this.activity.content.explanation) {
        this.explanationFormControl.setValue(this.activity.content.explanation)
      }
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
    console.log(this.activity)
    this.titleFormControl.valueChanges.subscribe((changedVal) => {
      this.activity.content.task = changedVal
    })
    this.timeFormControl.valueChanges.subscribe((changedVal) => {
      this.activity.config.time = changedVal
    })
    this.explanationFormControl.valueChanges.subscribe((changedVal) => {
      this.activity.content.explanation = changedVal
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.activity.content.items, event.previousIndex, event.currentIndex);
  }

    mediaSelection(index) {
      this.dialog.open(DialogMediaComponent, {
        width: '800px',
        height: '400px',
        data: {
          finalize: (asset) => {
            this.activity.content.items[index] = asset._id
          }
        }
        });
    }

    mediaUrl(assetId) {
      return this.contentService.API + 'assets/' + assetId + '/media'
    }

    removeMedia(index) {
      this.activity.content.items[index] = null;
    }
}
