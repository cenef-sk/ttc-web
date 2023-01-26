import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-activity-pass',
  templateUrl: './activity-pass.component.html',
  styleUrls: ['./activity-pass.component.css']
})
export class ActivityPassComponent implements OnInit {
  @Input() config = null;
  inPassDescFormControl = new FormControl();
  inPassFormControl = new FormControl();
  outPassFormControl = new FormControl();

  constructor() { }

  ngOnInit() {
    if (this.config && this.config.inPassDesc){
      this.inPassDescFormControl.setValue(this.config.inPassDesc)
    }
    if (this.config && this.config.inPass){
      this.inPassFormControl.setValue(this.config.inPass)
    }
    if (this.config && this.config.outPass){
      this.outPassFormControl.setValue(this.config.outPass)
    }
    this.inPassDescFormControl.valueChanges.subscribe((changedVal) => {
      this.config.inPassDesc = changedVal
    })
    this.inPassFormControl.valueChanges.subscribe((changedVal) => {
      this.config.inPass = changedVal
    })
    this.outPassFormControl.valueChanges.subscribe((changedVal) => {
      this.config.outPass = changedVal
    })
  }

}
