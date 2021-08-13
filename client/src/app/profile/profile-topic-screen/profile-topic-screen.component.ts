import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Topic } from 'src/app/topic/topic.model';
import { DeleteTopicDialogComponent } from '../delete-topic-dialog/delete-topic-dialog.component';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-userTopics',
  templateUrl: './profile-topic-screen.component.html',
  styleUrls: ['./profile-topic-screen.component.css']
})
export class ProfileTopicScreenComponent implements OnInit {
  @Input()
  topic: Topic;
  @Input() owner: boolean;
  validation: boolean;
  constructor(private _authService: UserDataService, private _snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
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

  deleteTopic(){
    if (this.owner) {
      const dialogRef = this.dialog.open(DeleteTopicDialogComponent, {
        data: {title: this.topic.title}
      });
      dialogRef.afterClosed().subscribe( async result => {
        await this.deleteTopicAfterValidation(result);
      });
    }
  }
  async deleteTopicAfterValidation(boolean: boolean){
    
    if (boolean){
      this._authService.deleteTopic(this.topic.id);
      this.editSuccesSnackBar();
    }
  }
  editSuccesSnackBar(){
    this._snackBar.open('Topic succesfully deleted')._dismissAfter(3000)
  }
}



