import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './intro/default-layout/default-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { Globals } from './globals';
import { SummaryComponent } from './summary/summary.component';
import { LoginComponent } from './intro/login/login.component';
import { httpInterceptorProviders } from './http-interceptors';
import { RegisterComponent } from './intro/register/register.component';

import { QuillModule } from 'ngx-quill';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Material
import {
  MatSelectModule, MatButtonModule, MatFormFieldModule, MatInputModule,
  MatRippleModule, MatToolbarModule, MatMenuModule, MatDialogModule,
  MatSidenavModule, MatSliderModule,
  MatIconModule, MatExpansionModule,
  MatCardModule, MatSnackBarModule,
  MatTableModule, MatCheckboxModule, MatBadgeModule, MatProgressSpinnerModule,
  MatListModule, MatStepperModule, MatTabsModule,} from '@angular/material';

import {DragDropModule} from '@angular/cdk/drag-drop';

//Translate
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {CustomLoader} from './translation.loader';

import { DialogTermsComponent } from './dialogs/dialog-terms/dialog-terms.component';
import { DialogAboutComponent } from './dialogs/dialog-about/dialog-about.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminWelcomeComponent } from './admin/admin-welcome/admin-welcome.component';
import { LogoutComponent } from './intro/logout/logout.component';
import { CookiesConsentComponent } from './intro/cookies-consent/cookies-consent.component';
import { ForgotComponent } from './intro/forgot/forgot.component';
import { ResetComponent } from './intro/reset/reset.component';
import { DialogWizardComponent } from './dialogs/dialog-wizard/dialog-wizard.component';
import { CuratorLayoutComponent } from './curator/curator-layout/curator-layout.component';
import { GamesComponent } from './curator/games/games.component';
import { OrgMembersComponent } from './curator/org-members/org-members.component';
import { OrgMediaLibraryComponent } from './curator/org-media-library/org-media-library.component';
import { CreateOrgComponent } from './curator/create-org/create-org.component';
import { WelcomeComponent } from './curator/welcome/welcome.component';
import { ProfileComponent } from './curator/profile/profile.component';
import { NewMediaAssetComponent } from './curator/new-media-asset/new-media-asset.component';
import { JoinOrgComponent } from './curator/join-org/join-org.component';
import { GameEditorComponent } from './curator/game-editor/game-editor.component';
import { DialogMediaComponent } from './dialogs/dialog-media/dialog-media.component';
import { OrgsManagementComponent } from './curator/orgs-management/orgs-management.component';
import { ViewMediaAssetComponent } from './curator/view-media-asset/view-media-asset.component';
import { MemoryActComponent } from './curator/game-builder/memory-act/memory-act.component';
import { TimelineActComponent } from './curator/game-builder/timeline-act/timeline-act.component';
import { LocateOnImgActComponent } from './curator/game-builder/locate-on-img-act/locate-on-img-act.component';
import { GameSetupComponent } from './curator/game-builder/game-setup/game-setup.component';
import { GameBgComponent } from './curator/game-builder/game-bg/game-bg.component';
import { QuizActComponent } from './curator/game-builder/quiz-act/quiz-act.component';
import { OneCorrectImgActComponent } from './curator/game-builder/one-correct-img-act/one-correct-img-act.component';
import { WizardButtonComponent } from './curator/wizard-button/wizard-button.component';
import { ActivityPassComponent } from './curator/game-builder/activity-pass/activity-pass.component';
import { QuestionComponent } from './curator/game-builder/question/question.component';
import { PairComponent } from './curator/game-builder/pair/pair.component';
import { PoiComponent } from './curator/game-builder/poi/poi.component';
import { GamingLayoutComponent } from './player/gaming-layout/gaming-layout.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { OpenQuestionItemComponent } from './curator/game-builder/open-question-item/open-question-item.component';
import { OpenQuestionComponent } from "./curator/game-builder/open-question/open-question.component";

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    PageNotFoundComponent,
    SummaryComponent,
    LoginComponent,
    RegisterComponent,
    AdminLayoutComponent,
    DialogTermsComponent,
    DialogAboutComponent,
    AdminUsersComponent,
    AdminWelcomeComponent,
    LogoutComponent,
    CookiesConsentComponent,
    ForgotComponent,
    ResetComponent,
    DialogWizardComponent,
    CuratorLayoutComponent,
    GamesComponent,
    OrgMembersComponent,
    OrgMediaLibraryComponent,
    CreateOrgComponent,
    WelcomeComponent,
    ProfileComponent,
    NewMediaAssetComponent,
    JoinOrgComponent,
    GameEditorComponent,
    DialogMediaComponent,
    OrgsManagementComponent,
    ViewMediaAssetComponent,
    MemoryActComponent,
    TimelineActComponent,
    LocateOnImgActComponent,
    GameSetupComponent,
    GameBgComponent,
    QuizActComponent,
    OneCorrectImgActComponent,
    WizardButtonComponent,
    ActivityPassComponent,
    QuestionComponent,
    PairComponent,
    PoiComponent,
    GamingLayoutComponent,
    OpenQuestionComponent,
    OpenQuestionItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: CustomLoader
        }
    }),
    QuillModule.forRoot({
      suppressGlobalRegisterWarning: true
    }),
    BrowserAnimationsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatToolbarModule,
    MatMenuModule,
    MatDialogModule,
    MatSidenavModule,
    MatSliderModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatListModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatStepperModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    DragDropModule,
    ImageCropperModule,
],
  providers: [Globals, httpInterceptorProviders,
  { provide: 'LOCALSTORAGE', useFactory: getLocalStorage }],

  bootstrap: [AppComponent],
  entryComponents: [
    DialogTermsComponent,
    DialogAboutComponent,
    CookiesConsentComponent,
    DialogWizardComponent,
    DialogMediaComponent
  ]
})
export class AppModule { }

export function getLocalStorage() {
  return (typeof window !== "undefined") ? window.localStorage : null;
}
