import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Reply } from '../reply.model';
import { TopicDataService } from '../topic-data.service';

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input()
  reply: Reply;
  public errorMessage: string = ""
  constructor(private _snackBar: MatSnackBar, private _topicDataService: TopicDataService,private router: Router) { }

  ngOnInit(): void {
  }

  public dateFormat(): string{
    var dt = this.reply.dateOfCreation;
    var date = new Date();
    var differenceInDays = ( date.getTime() - this.reply.dateOfCreation.getTime()) / (1000 * 3600 * 24)
    if (differenceInDays < 1){
      return this.reply.dateOfCreation.getHours() + ":" + (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
    } else {
      return this.reply.dateOfCreation.toLocaleDateString('en-GB');
    }
    
  }
  delete(){
    if (localStorage.getItem('currentUser')){
      this._topicDataService.deleteComment(this.reply.id);
      
      this.deleteSuccesSnackbar();
    } else {
      this.errorMessage = 'You need to be logged in to delete your comment';
    }
  }
  deleteSuccesSnackbar(){
    this._snackBar.open('Comment succesfully deleted')._dismissAfter(3000)
  }
}
