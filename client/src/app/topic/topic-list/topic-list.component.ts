import { Component, Input, OnInit } from '@angular/core';

import { EMPTY, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { TopicDataService } from '../topic-data.service';

import { Topic } from '../topic.model';


@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})
export class TopicListComponent implements OnInit {
  public titleFilter: string;
  public filterTopic$ = new Subject<string>();
  private _fetchTopics$: Observable<Topic[]>;
  public errorMessage: string = "";

  constructor(private _topicDataService: TopicDataService) {
    this._fetchTopics$ = 
    this._topicDataService.topics$.pipe(map(topics => topics.sort((t1, t2) => t1.dateOfCreation.getTime() - t2.dateOfCreation.getTime())))
    .pipe(
      catchError((err) => {
        this.errorMessage = "Unable to connect to server, try again later.";
        return EMPTY;
      })
    );
    
   }

  get topics$(): Observable<Topic[]> {
    return this._fetchTopics$;
  }

  // handleError(err: any) {
  //   this.errorMessage = err.message;
  //   return of([]);
  // }
  ngOnInit(): void {
    
    
    
  }
  
  tabClick(tab) {
    if (tab.index == 0){
      this.sortByDate();
    } else {
      this.sortByViews();
    }
  }
  sortByDate() {
    this._fetchTopics$ = this._topicDataService.topics$.pipe(map(topics => topics.sort((t1, t2) => t1.dateOfCreation.getTime() - t2.dateOfCreation.getTime())));
    //return topics.sort((t1, t2) => t1.postedOn.getTime() - t2.postedOn.getTime());
 }

  sortByViews() {
    this._fetchTopics$ = this._topicDataService.topics$.pipe(map(topics => topics.sort((t1, t2) => t2.numberOfViews - t1.numberOfViews)));
    //return topics.sort((t1, t2) => t2.numberOfViews - t1.numberOfViews);
  }
  filter(){
    this.filterTopic$.pipe(distinctUntilChanged(), debounceTime(550)).subscribe(s => this.titleFilter = s);
    this._fetchTopics$ = this._fetchTopics$.pipe(map(items => items.filter(item => item.title.toLowerCase().indexOf(this.titleFilter) > -1)));
  }
  
}
