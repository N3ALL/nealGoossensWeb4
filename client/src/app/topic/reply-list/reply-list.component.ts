import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Reply } from '../reply.model';
import { TopicDataService } from '../topic-data.service';
import { Topic } from '../topic.model';
import { ReversePipe } from '../../reversePipe';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.css']
})
export class ReplyListComponent implements OnInit {
  private refreshReplies$ = new BehaviorSubject<boolean>(true);
  private _fetchReplies$: Observable<Reply[]>;
  @Input() id: number;
  constructor(private _topicDataService: TopicDataService) { 
    
    
  }

  get replies$(): Observable<Reply[]> {
    return this._fetchReplies$.pipe();
  }
  // getReplies()
  // {
  //   this._fetchReplies$ = this._topicDataService.getTopicReplies$(this.id);
  // }  
  ngOnInit(): void {
    this._fetchReplies$ = this.refreshReplies$.pipe(switchMap(_ => this._topicDataService.getTopicReplies$(this.id)));
  }
  // ngOnChanges(changes: SimpleChanges) {
  //   if (changes['id']) {
  //       this.id = changes['id'].currentValue;
  //       this.getReplies();
        
  //   }}

}
