import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { QuizComponent } from './quiz/quiz.component';
import { AdminUsersComponent } from './profile/admin-users/admin-users.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { PendingQuizzesComponent } from './profile/pending-quizzes/pending-quizzes.component';
import { QuizCheckComponent } from './quiz-check/quiz-check.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MatExpansionModule } from '@angular/material/expansion'
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SubmittedQuizComponent } from './quiz-add/submitted-quiz/submitted-quiz.component';
import { FlexModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSortModule } from "@angular/material/sort";
import { MatRadioModule } from "@angular/material/radio";
import { QuizDialogComponent } from './quiz/quiz-dialog/quiz-dialog.component';
import { MatTabsModule } from "@angular/material/tabs";

import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { LayoutModule } from '@angular/cdk/layout';

import { FlexLayoutModule } from "@angular/flex-layout";
import { AchievementsListComponent } from './dashboard/achievements-list/achievements-list.component';
import { RatingListComponent } from './dashboard/rating-list/rating-list.component';
import { QuizzesPageComponent } from "./quizzes-page/quizzes-page.component";
import { GameQuestionComponent } from './game/game-question/game-question.component';
import { GameAnswerComponent } from './game/game-answer/game-answer.component';
import { GameOptionalAnswerComponent } from './game/game-optional-answer/game-optional-answer.component';
import { GameSequenceAnswerComponent } from './game/game-sequence-answer/game-sequence-answer.component';
import { GameStringAnswerComponent } from './game/game-string-answer/game-string-answer.component';
import { GameBooleanAnswerComponent } from './game/game-boolean-answer/game-boolean-answer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GameStartComponent } from './game/game-start/game-start.component';
import { GameSettingsComponent } from './game/game-settings/game-settings.component';
import { GameFinishComponent } from './game/game-finish/game-finish.component';
import {QuizInfoComponent} from "./quiz-check/quiz-info/quiz-info.component";
import {QuestionCheckComponent} from "./quiz-check/question-check/question-check.component";
import {QuizCheckNavComponent} from "./quiz-check/quiz-check-nav/quiz-check-nav.component";
import { SetPasswordComponent } from './set-password/set-password.component';
import { PlayedGameComponent } from './profile/played-game/played-game.component';
import { GameResultDialogComponent } from './profile/played-game/game-result-dialog/game-result-dialog.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {CanDeactivateGuardService} from "./service/canDeactivateGuardService/can-deactivate-guard.service";
import {MatBadgeModule} from "@angular/material/badge";
import { RejectMessagesDialogComponent } from './profile/my-quizzes/reject-messages-dialog/reject-messages-dialog.component';
import {UserInformationComponent} from "./profile/user-information/user-information.component";
import {RouterModule, Routes} from "@angular/router";
import {FriendsComponent} from "./profile/friends/friends.component";
import {MyQuizzesComponent} from "./profile/my-quizzes/my-quizzes.component";
import {FavoriteComponent} from "./profile/favorite/favorite.component";
import {ChangePasswordComponent} from "./profile/change-password/change-password.component";
import {RegistrationComponent} from "./registration/registration.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./_helpers/auth-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {QuestionComponent} from "./quiz-add/question/question.component";
import {NewQuizComponent} from "./quiz-add/new-quiz/new-quiz.component";
import {AddQuestionsComponent} from "./quiz-add/add-questions/add-questions.component";
import {NavigationComponent} from "./navigation/navigation.component";
import {ProfileNavigationComponent} from "./profile/profile-navigation/profile-navigation.component";
import {LeftBarComponent} from "./profile/left-bar/left-bar.component";
import {OptionalAnswerComponent} from "./quiz-add/optional-answer/optional-answer.component";
import {BooleanAnswerComponent} from "./quiz-add/boolean-answer/boolean-answer.component";
import {StringAnswerComponent} from "./quiz-add/string-answer/string-answer.component";
import {AnswerComponent} from "./quiz-add/answer/answer.component";
import {ImageUploadComponent} from "./image-upload/image-upload.component";
import {SequenceAnswerComponent} from "./quiz-add/sequence-answer/sequence-answer.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";



const quizCheckRoutes: Routes = [
  {
    path: 'quizinfo',
    component: QuizInfoComponent,
    outlet: 'quiznav'
  },
  {
    path: 'qAnda',
    component: QuestionCheckComponent,
    outlet: 'quiznav'
  }
];

const profileRoutes: Routes = [
  {
    path: 'profinfo',
    component: UserInformationComponent,
    outlet: 'profilenav'
  },
  {
    path: 'adminUsers',
    component: AdminUsersComponent,
    outlet: 'profilenav'
  },
  {
    path: 'pendingQuizzes',
    component: PendingQuizzesComponent,
    outlet: 'profilenav'
  },
  {
    path: 'friends',
    component: FriendsComponent,
    outlet: 'profilenav'
  },
  {
    path: 'mygames',
    component: MyQuizzesComponent,
    outlet: 'profilenav'
  },
  {
    path: 'favorite',
    component: FavoriteComponent,
    outlet: 'profilenav'
  },
  {
    path: 'changePass',
    component: ChangePasswordComponent,
    outlet: 'profilenav'
  },
  {
    path: 'played',
    component: PlayedGameComponent,
    outlet: 'profilenav'
  }
];

const appRoutes: Routes = [
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile/:id', canActivate: [AuthGuardService],
    component: ProfileComponent,
    children: profileRoutes,
  },
  {
    path: 'friends', canActivate: [AuthGuardService],
    component: FriendsComponent
  },
  {
    path: 'quizzes/:id',
    component: QuizComponent
  },
  {
    path: 'quiz',
    component: QuizComponent
  },
  {
    path: 'friends', canActivate: [AuthGuardService],
    component: FriendsComponent
  },
  {
    path: 'quizzes/:id',
    component: QuizComponent
  },
  {
    path: 'question',
    component: QuestionComponent
  },
  {
    path: 'new_quiz',
    component: NewQuizComponent
  },
  {
    path: 'add_questions',
    component: AddQuestionsComponent
  },
  {
    path: 'submitted_quiz',
    component: SubmittedQuizComponent
  },
  {
    path: 'quizzes',
    component: QuizzesPageComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'pendingQuizzes', canActivate: [AuthGuardService],
    component: PendingQuizzesComponent
  },
  {
    path: 'game/question/:gameId/:questionNumber',
    component: GameQuestionComponent,
    canDeactivate: [CanDeactivateGuardService],
    runGuardsAndResolvers: 'always',
  },
  {
    path: 'game/settings/:quizId',
    component: GameSettingsComponent
  },
  {
    path: 'game/start/:gameId',
    component: GameStartComponent,
    canDeactivate: [CanDeactivateGuardService]
  },
  {
    path: 'game/finish/:gameId',
    component: GameFinishComponent
  },
  {
    path: 'pendingQuizzes', canActivate: [AuthGuardService],
    component: PendingQuizzesComponent
  },
  {
    path: 'checkquiz/:id', canActivate: [AuthGuardService],
    component: QuizCheckComponent,
    children: quizCheckRoutes,
  },
  {
    path: 'adminUsers', canActivate: [AuthGuardService],
    component: AdminUsersComponent
  },
  {
    path: 'activate/:code',
    component: SetPasswordComponent
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    NavigationComponent,
    ProfileComponent,
    ProfileNavigationComponent,
    LeftBarComponent,
    UserInformationComponent,
    FriendsComponent,
    MyQuizzesComponent,
    FavoriteComponent,
    ChangePasswordComponent,
    QuizComponent,
    QuestionComponent,
    OptionalAnswerComponent,
    BooleanAnswerComponent,
    StringAnswerComponent,
    SequenceAnswerComponent,
    ImageUploadComponent,
    AnswerComponent,
    NewQuizComponent,
    AddQuestionsComponent,
    SubmittedQuizComponent,
    QuizzesPageComponent,
    QuizDialogComponent,
    AddQuestionsComponent,
    DashboardComponent,
    AchievementsListComponent,
    RatingListComponent,
    GameQuestionComponent,
    GameAnswerComponent,
    GameOptionalAnswerComponent,
    GameSequenceAnswerComponent,
    GameStringAnswerComponent,
    GameBooleanAnswerComponent,
    GameStartComponent,
    GameSettingsComponent,
    GameFinishComponent,
    AdminUsersComponent,
    PendingQuizzesComponent,
    QuizCheckComponent,
    QuestionCheckComponent,
    QuizInfoComponent,
    QuizCheckNavComponent,
    SetPasswordComponent,
    PlayedGameComponent,
    GameResultDialogComponent,
    RatingListComponent,
    AdminUsersComponent,
    PendingQuizzesComponent,
    QuizCheckComponent,
    QuestionCheckComponent,
    QuizInfoComponent,
    QuizCheckNavComponent,
    RejectMessagesDialogComponent
  ],
    imports: [
        NgbModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        FlexModule,
        MatToolbarModule,
        MatButtonModule,
        MatSortModule,
        MatIconModule,
        MatMenuModule,
        MatRadioModule,
        MatCardModule,
        MatSelectModule,
        MatGridListModule,
        MatFormFieldModule,
        MatChipsModule,
        MatExpansionModule,
        MatDividerModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        LayoutModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        MatDialogModule,
        DragDropModule,
        LayoutModule,
        FlexLayoutModule,
        MatProgressBarModule,
        InfiniteScrollModule,
        MatBadgeModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [OptionalAnswerComponent, BooleanAnswerComponent, StringAnswerComponent, SequenceAnswerComponent],
})
export class AppModule {
}
