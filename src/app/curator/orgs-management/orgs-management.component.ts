import { Component, OnInit } from '@angular/core';
import { Globals } from "src/app/globals";
import { ContentService } from "src/app/content.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orgs-management',
  templateUrl: './orgs-management.component.html',
  styleUrls: ['./orgs-management.component.css']
})
export class OrgsManagementComponent implements OnInit {
  public orgs = [];
  displayedColumns: string[] = ['name','description', 'role', 'edit', 'delete'];

  constructor(
    private globals: Globals,
    public contentService: ContentService,
    private router: Router,
  ) { }

  ngOnInit() {
    //TODO No real need to pass orgId - token already contain it
    this.contentService.getOrgsForUser(this.globals.user._id).subscribe((orgs) => {
      this.orgs = orgs
    })
  }

  userRole(org) {
    const userId = this.globals.user._id;
    const member = org.members.find((member) => (member.user == userId));
    if (member.role == "Admin") {
      return "Administrátor"
    } else {
      return "Člen"
    }
  }

  delete(org) {
    if (confirm("Naozaj chcete túto organizáciu odstániť?")) {
      this.contentService.deleteOrg(org._id).subscribe((res) => {
        if (res.success) {
          alert("Odstánenie prebehlo úspešne.")
          this.reload();
        }
      })
    }
  }

  edit(org) {
    this.router.navigate(['/curator/edit-org', org._id]);
  }

  reload() {
    window.location.reload();
  }

  isAdmin(org) {
    const userId = this.globals.user._id;
    const member = org.members.find((member) => (member.user == userId));
    return (member.role == "Admin")
  }
}
