import { Component, OnInit } from '@angular/core';
import { User } from "src/model/User";
import { ContentService } from "src/app/content.service";
import { Globals } from "src/app/globals";


@Component({
  selector: 'app-org-members',
  templateUrl: './org-members.component.html',
  styleUrls: ['./org-members.component.css']
})
export class OrgMembersComponent implements OnInit {

  public members = [];
  displayedColumns: string[] = ['name', 'role', 'accept', 'revoke', 'remove'];

  constructor(
    private globals: Globals,
    public contentService: ContentService,
  ) { }

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this.contentService.getOrgMembers(this.globals.org._id).subscribe((res) => {
      if (res && res.members && res.members.length) {
        this.members = res.members
        if (res && res.memberRequests && res.memberRequests.length) {
          this.members = this.members.concat(
            res.memberRequests.map(
              user => {return(
                {user: {name: user.name, _id:user._id}}
              )}
            )
          );
        }
      } else {
        this.members = []
      }
    })
  }

  accept(user) {
    let orgId = this.globals.org._id
    this.contentService.acceptJoinOrg(orgId, user._id).subscribe((res) => {
      this.loadData()
    })
  }
  revoke(user) {
    console.log(user)
    let orgId = this.globals.org._id
    this.contentService.rejectJoinOrg(orgId, user._id).subscribe((res) => {
      this.loadData()
    })
  }

  cancel(user) {
    console.log(user)
    let orgId = this.globals.org._id
    this.contentService.cancelMembershipOrg(orgId, user._id).subscribe((res) => {
      this.loadData()
    })
  }

  isAdmin() {
    //TODO check why it does not work all the time
    return (this.globals.org.role=="Admin")
  }

}
