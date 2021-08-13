import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Profile } from '../profile/profile.model';
import { newReply } from './newReply.model';
import { Reply } from './reply.model';
import { TopicDetailComponent } from './topic-detail/topic-detail.component';


import { Topic } from './topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicDataService {
  
  private _reloadReplies$ = new BehaviorSubject<boolean>(true);
  private _reloadTopics$ = new BehaviorSubject<boolean>(true);
  
  constructor(private _http: HttpClient){
    
  }
   get topics$() : Observable<Topic[]>{
     
     return this._reloadTopics$.pipe(switchMap(() => this._http
     .get(`${environment.apiUrl}/Topic`)
     .pipe(catchError(this.handleError),map((t: any[]) => t.map(Topic.fromJSON))))); 
   }

   getTopicReplies$(id: number): Observable<Reply[]> {
    return this._reloadReplies$.pipe(switchMap(() => this.fetchReplies$(id)))
  }
  fetchReplies$(id: number){
    return this._http
      .get(`${environment.apiUrl}/Reply/${id}/TopicReplies`)
      .pipe(map((r: any[]) => r.map(Reply.fromJSON))); 
  }
  getTopicById$(id: number): Observable<Topic>{
    return this._http.get(`${environment.apiUrl}/Topic/${id}/topicdetails`)
    .pipe(map(Topic.fromJSON))
  }

  postComment(reply: newReply) {
    var replyJson = reply.toJSON();
    const localToken = localStorage.getItem('currentUser');
    if (localToken){
      this._http.post(`${environment.apiUrl}/Reply/postComment/${localToken}`, replyJson).subscribe(() => {
        this._reloadReplies$.next(true);
      })
    } else {

    }
  }
  postTopic(topic: Topic){
    var TopicJson = topic.toJSON();
    const localToken = localStorage.getItem('currentUser');
    if (localToken){
      this._http.post(`${environment.apiUrl}/topic/postTopic/${localToken}`, TopicJson).subscribe();
    }
  }

  deleteComment(id: number){
    this._http.delete(`${environment.apiUrl}/Reply/deleteComment/${id}/${localStorage.getItem('currentUser')}`).subscribe(() => {
      this._reloadReplies$.next(true);
    });
  }
  handleError(error: HttpErrorResponse): Observable<never> {
    var errorMessage = "Problem when trying to connect to server."
    return throwError(errorMessage);
  }
}
