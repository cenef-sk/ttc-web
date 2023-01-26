import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ContentService } from "src/app/content.service";
import { Globals } from "src/app/globals";

@Component({
  selector: 'app-join-org',
  templateUrl: './join-org.component.html',
  styleUrls: ['./join-org.component.css']
})
export class JoinOrgComponent implements OnInit {
  public orgs = [];
  displayedColumns: string[] = ['name','description', 'join'];

  constructor(
    private globals: Globals,
    public contentService: ContentService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.contentService.getOrgs().subscribe((orgs) => {
      this.orgs = orgs
    })
  }

  join(org) {
    this.contentService.joinOrg(org._id).subscribe((res) => {
      this.loadData()
    })
  }
  revoke(org) {
    this.contentService.cancelJoinOrg(org._id).subscribe((res) => {
      this.loadData()
    })
  }

  isMember(org) {
    let userId = this.globals.user._id
    let member = org.members.some((member) => (member.user == userId));
    return (member);
  }
  isPending(org) {
    let userId = this.globals.user._id
    let pending = org.memberRequests.some((id) => (userId == id))
    return (pending);
  }

  reload() {
    window.location.reload();
  }
}
