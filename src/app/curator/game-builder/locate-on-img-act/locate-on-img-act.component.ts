import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { DialogMediaComponent } from "src/app/dialogs/dialog-media/dialog-media.component";
import { Globals } from "src/app/globals";
import { MatDialog } from "@angular/material";
import { ContentService } from "src/app/content.service";
import { FormControl } from "@angular/forms";
import { CdkDragEnd } from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-locate-on-img-act',
  templateUrl: './locate-on-img-act.component.html',
  styleUrls: ['./locate-on-img-act.component.css']
})
export class LocateOnImgActComponent implements OnInit {
  @ViewChild('levelMapImg')
  levelMapImg: ElementRef<HTMLImageElement>;

  @ViewChild('canvasMap')
  canvasMap: ElementRef<HTMLDivElement>;;
  timeFormControl = new FormControl();

  circles = [
    "black.png","blue.png","azure.png","yellow.png","red.png","white.png"
  ]
  // bg = null;

  @Input() activity = null;

  constructor(
    private globals: Globals,
    public dialog: MatDialog,
    public contentService: ContentService
  ) { }

  selected(index) {
      this.activity.content.selectedPointer = index
  }

  loaded() {
    let width = this.levelMapImg.nativeElement.getBoundingClientRect().width
    let height = this.levelMapImg.nativeElement.getBoundingClientRect().height
    this.activity.content.width = width
    this.activity.content.height = height
  }
  dragEnd($event: CdkDragEnd, poi) {
    poi.transf = this.getMatrix($event.source.element.nativeElement)
  }

  getMatrix(element) {
      const values = element.style.transform.split(/\w+\(|\);?/);
      const transform = values[1].split(/,\s?/g).map((val) => {
        return(parseInt(val))
      });

      return [transform[0], transform[1]];
  }
  ngOnInit() {
    if (!this.activity.content){
      this.activity.content = {
        asset: null,
        pois: [],
        selectedPointer: 0,
        width: null,
        height: null,
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

  mediaSelection(pair, itemNum) {
    this.dialog.open(DialogMediaComponent, {
      width: '800px',
      height: '400px',
      data: {
        finalize: (asset) => {
          this.activity.content.asset = asset._id
        }
      }
      });
  }

  mediaUrl(assetId) {
    return this.contentService.API + 'assets/' + assetId + '/media'
  }

  add() {
    this.activity.content.pois = this.activity.content.pois.concat({
      name: "Bod č. " + (this.activity.content.pois.length + 1),
      position: [10, 10],
      explanation: "",
      question: "",
    })
  }

}
