import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './intro/default-layout/default-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './intro/login/login.component';
import { RegisterComponent } from './intro/register/register.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';
import { LogoutComponent } from './intro/logout/logout.component';
import { ForgotComponent } from "./intro/forgot/forgot.component";
import { ResetComponent } from "./intro/reset/reset.component";
import { CuratorLayoutComponent } from "./curator/curator-layout/curator-layout.component";
import { GamesComponent } from "./curator/games/games.component";
import { WelcomeComponent } from "./curator/welcome/welcome.component";
import { OrgMediaLibraryComponent } from "./curator/org-media-library/org-media-library.component";
import { OrgMembersComponent } from "./curator/org-members/org-members.component";
import { ProfileComponent } from "./curator/profile/profile.component";
import { CreateOrgComponent } from "./curator/create-org/create-org.component";
import { NewMediaAssetComponent } from "./curator/new-media-asset/new-media-asset.component";
import { JoinOrgComponent } from "./curator/join-org/join-org.component";
import { GameEditorComponent } from "./curator/game-editor/game-editor.component";
import { OrgsManagementComponent } from "./curator/orgs-management/orgs-management.component";
import { ViewMediaAssetComponent } from "./curator/view-media-asset/view-media-asset.component";
import { GamingLayoutComponent } from "./player/gaming-layout/gaming-layout.component";

const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      },
      {
        path: 'forgot',
        component: ForgotComponent
      },
      {
        path: 'reset',
        component: ResetComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          component: AdminWelcomeComponent
        },
        {
          path: 'users',
          component: AdminUsersComponent
        },
        {
          path: '**',
          component: PageNotFoundComponent
        }
      ]
  },
  {
    path: 'curator',
    component: CuratorLayoutComponent,
    children: [
        {
          path: '',
          component: WelcomeComponent
        },
        {
          path: 'media-library',
          component: OrgMediaLibraryComponent
        },
        {
          path: 'members',
          component: OrgMembersComponent
        },
        {
          path: 'games',
          component: GamesComponent
        },
        {
          path: 'new-game',
          component: GameEditorComponent
        },
        {
          path: 'edit-game/:id',
          component: GameEditorComponent
        },
        {
          path: 'profile',
          component: ProfileComponent
        },
        {
          path: 'new-org',
          component: CreateOrgComponent
        },
        {
          path: 'edit-org/:id',
          component: CreateOrgComponent
        },
        {
          path: 'join',
          component: JoinOrgComponent
        },
        {
          path: 'new-media-asset',
          component: NewMediaAssetComponent
        },
        {
          path: 'edit-media-asset/:id',
          component: NewMediaAssetComponent
        },
        {
          path: 'view-media-asset/:id',
          component: ViewMediaAssetComponent
        },
        {
          path: 'orgs-management',
          component: OrgsManagementComponent
        },
        {
          path: '**',
          component: PageNotFoundComponent
        }
      ]
  },
  {
    path: 'player',
    component: GamingLayoutComponent,
    children: []
  },
  {
    path: '**',
    component: DefaultLayoutComponent,
    children: [
      {
        path: '',
        component: PageNotFoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
