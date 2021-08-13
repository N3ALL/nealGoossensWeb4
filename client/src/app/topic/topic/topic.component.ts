import { Component, Input, OnInit } from '@angular/core';

import { Topic } from '../topic.model';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})


export class TopicComponent implements OnInit {
  @Input()
  topic: Topic;
  
  constructor() { }

  ngOnInit(): void {
    
  }
  // public DateToTime(): string{
  //   return this.topic.DateToString();
  // }
  
  public dateFormat(): string{
    var dt = this.topic.dateOfCreation;
    var date = new Date();
    var differenceInDays = ( date.getTime() - this.topic.dateOfCreation.getTime()) / (1000 * 3600 * 24)
    if (differenceInDays < 1){
      return this.topic.dateOfCreation.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    } else {
      return this.topic.dateOfCreation.toLocaleDateString('en-GB');
    }
    
  }
}
