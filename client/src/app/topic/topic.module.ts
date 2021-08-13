import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic/topic.component';
import { TopicListComponent } from './topic-list/topic-list.component';
import { MaterialsModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { Profile } from '../profile/profile.model';
import { TopicFilterPipe } from '../topic-filter.pipe';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';
import { ReplyComponent } from './reply/reply.component';
import { ReplyListComponent } from './reply-list/reply-list.component';
import { NewTopicComponent } from './new-topic/new-topic.component';


@NgModule({
  declarations: [TopicComponent, TopicListComponent, TopicFilterPipe, TopicDetailComponent, ReplyComponent, ReplyListComponent, NewTopicComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    HttpClientModule,
    Profile
  ],
  exports: [
    MaterialsModule
  ]
})
export class TopicModule { }
