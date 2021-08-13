import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { TopicListComponent } from './topic/topic-list/topic-list.component';
import { TopicComponent } from './topic/topic/topic.component';
import { MaterialsModule } from './material/material.module';
import { LoginScreenComponent } from './profile/login-screen/login-screen.component';
import { RegisterScreenComponent } from './profile/register-screen/register-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { ReplyListComponent } from './topic/reply-list/reply-list.component';
import { TopicDetailComponent } from './topic/topic-detail/topic-detail.component';
import { ReplyComponent } from './topic/reply/reply.component';
import { RouterModule, Routes } from '@angular/router';
import { NewTopicComponent } from './topic/new-topic/new-topic.component';
import { ProfileScreenComponent } from './profile/profile-screen/profile-screen.component';
import { ReversePipe } from './reversePipe';
import { ProfileTopicScreenComponent } from './profile/profile-topic-screen/profile-topic-screen.component';
import { TopicFilterPipe } from './topic-filter.pipe';
import { GuestProfileScreenComponent } from './profile/guest-profile-screen/guest-profile-screen.component';
import { DeleteTopicDialogComponent } from './profile/delete-topic-dialog/delete-topic-dialog.component';


const appRoutes: Routes = [
  { path: "topic/list", component: TopicListComponent },
  { path: "user/login", component: LoginScreenComponent },
  { path: "user/register", component: RegisterScreenComponent },
  { path: "", redirectTo: "topic/list", pathMatch: "full" },
  { path: "topic/details/:id", component: TopicDetailComponent },
  { path: "topic/new-topic", component: NewTopicComponent},
  { path: "user/profile", component: ProfileScreenComponent},
  { path: "user/guestProfile/:id/:boolean", component: GuestProfileScreenComponent},
  { path: "**", component: TopicListComponent }
];



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    TopicListComponent,
    TopicComponent,
    LoginScreenComponent,
    RegisterScreenComponent,
    ReplyListComponent,
    TopicDetailComponent,
    ReplyComponent,
    NewTopicComponent,
    ProfileScreenComponent,
    ReversePipe,
    ProfileTopicScreenComponent,
    GuestProfileScreenComponent,
    DeleteTopicDialogComponent,
    TopicFilterPipe
    
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MaterialsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
