import { Location } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { newReply } from '../newReply.model';
import { ReplyListComponent } from '../reply-list/reply-list.component';
import { Reply } from '../reply.model';
import { TopicDataService } from '../topic-data.service';
import { Topic } from '../topic.model';

@Component({
  selector: 'app-topic-detail',
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.css']
})
export class TopicDetailComponent implements OnInit {
  @Input()
  topic: Topic;
  public errorMessage = '';
  private _topic$: Observable<Topic>;
  

  constructor(private _topicDataService: TopicDataService, private _router: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private _location: Location, private _snackBar: MatSnackBar) {
    var x = this._router.snapshot.params.id;
    this._topicDataService.getTopicById$(x).subscribe(topic => this.topic = topic);
   }

   public comment: FormGroup;
  ngOnInit(): void {
    this.comment = this.fb.group({
      comment: ['', Validators.required],
    });
  }
  
  public dateFormat(): string{
    var dt = this.topic?.dateOfCreation;
    var date = new Date();
    var differenceInDays = ( date.getTime() - this.topic?.dateOfCreation.getTime()) / (1000 * 3600 * 24)
    if (differenceInDays < 1){
      return this.topic?.dateOfCreation.getHours() + ":" + (dt?.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    } else {
      return this.topic?.dateOfCreation.toLocaleDateString('en-GB');
    }
    
  }

  onSubmit() {
    if (localStorage.getItem('currentUser')){
      if(this.comment.valid){
        var x = new newReply(this.topic.id,this.comment.value.comment);
        this._topicDataService.postComment(x);
        this.openSnackBar()
        this.comment.setValue({ comment: ""});
        this.comment.markAsUntouched()
      } else {
        this.errorMessage = 'Your comment is too empty.'
      }
    } else {
      this.errorMessage = 'You need to log in to place a comment.'
    }
    
    
  }
    openSnackBar(){
      this._snackBar.open('New reply succesfully added')._dismissAfter(2000)
    }
}
