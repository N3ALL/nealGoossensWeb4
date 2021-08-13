import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { MaterialsModule } from '../material/material.module';
import { ProfileComponent } from './profile/profile.component';
import { ProfileScreenComponent } from './profile-screen/profile-screen.component';
import { ProfileTopicScreenComponent } from './profile-topic-screen/profile-topic-screen.component';
import { GuestProfileScreenComponent } from './guest-profile-screen/guest-profile-screen.component';
import { DeleteTopicDialogComponent } from './delete-topic-dialog/delete-topic-dialog.component';



@NgModule({
  declarations: [LoginScreenComponent, RegisterScreenComponent, ProfileComponent, ProfileScreenComponent, ProfileTopicScreenComponent, GuestProfileScreenComponent, DeleteTopicDialogComponent],
  imports: [
    CommonModule,
    MaterialsModule,
  ]
})
export class ProfileModule { }
