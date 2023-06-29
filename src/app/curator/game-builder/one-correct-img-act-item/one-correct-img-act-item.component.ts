import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { FormControl } from "@angular/forms";
import { loadCroppedImageFromURL } from "src/utils/imageUtils";
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";

@Component({
  selector: 'app-one-correct-img-act-item',
  templateUrl: './one-correct-img-act-item.component.html',
  styleUrls: ['./one-correct-img-act-item.component.css']
})
export class OneCorrectImgActItemComponent implements OnInit {
  @Input() question = null;
  @Input() index = 0;

  @Output() removeEvent = new EventEmitter<number>();

  questionFormControl = new FormControl();
  explanationFormControl = new FormControl();
  item1FormControl = new FormControl();
  item2FormControl = new FormControl();

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  ngOnInit() {
    if (this.question) {
      this.questionFormControl.setValue(this.question.question)
      this.explanationFormControl.setValue(this.question.explanation)
      this.item1FormControl.setValue(this.question.correct.text)
      this.item2FormControl.setValue(this.question.wrong.text)
      loadCroppedImageFromURL(this.mediaUrl(this.question.correct.img), this.question.correct.crop, this.imgWidth, this.imgWidth).then(data => {
        this.croppedImage1 = data
      })
      loadCroppedImageFromURL(this.mediaUrl(this.question.wrong.img), this.question.wrong.crop, this.imgWidth, this.imgWidth).then(data => {
        this.croppedImage2 = data
      })

    }

    this.questionFormControl.valueChanges.subscribe((changedVal) => {
      this.question.question = changedVal
    })
    this.explanationFormControl.valueChanges.subscribe((changedVal) => {
      this.question.explanation = changedVal
    })
    this.item1FormControl.valueChanges.subscribe((changedVal) => {
      this.question.correct.text = changedVal
    })
    this.item2FormControl.valueChanges.subscribe((changedVal) => {
      this.question.wrong.text = changedVal
    })
  }

  croppedImage1 = null
  croppedImage2 = null
  imgWidth = 300

  mediaSelection(question, index) {
    this.dialog.open(DialogMediaComponent, {
      width: '800px',
      height: '400px',
      data: {
        finalize: (asset, crop?) => {
          if(index == 0) {
            question.correct.img = asset._id
            question.correct.crop = crop
            loadCroppedImageFromURL(this.mediaUrl(question.correct.img), crop, this.imgWidth, this.imgWidth).then(data => {
              this.croppedImage1 = data
            })
          } else {
            question.wrong.img = asset._id
            question.wrong.crop = crop
            loadCroppedImageFromURL(this.mediaUrl(question.wrong.img), crop, this.imgWidth, this.imgWidth).then(data => {
              this.croppedImage2 = data
            })
          }
        },
        crop: true
      }
      });
  }


  mediaUrl(assetId) {
    return this.contentService.API + 'assets/' + assetId + '/media'
  }
  remove(index) {
    this.removeEvent.emit(index);
  }

  removeMedia(index) {
    if(index == 0) {
      this.question.correct.img = null
      delete this.question.correct.crop
      this.croppedImage1 = null
    } else {
      this.question.wrong.img = null
      delete this.question.wrong.crop
      this.croppedImage2 = null
    }
  }
}
