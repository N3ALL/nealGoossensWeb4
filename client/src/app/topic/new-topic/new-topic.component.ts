import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicDataService } from '../topic-data.service';
import { Topic } from '../topic.model';


@Component({
  selector: 'app-new-topic',
  templateUrl: './new-topic.component.html',
  styleUrls: ['./new-topic.component.css']
})
export class NewTopicComponent implements OnInit {
  @Input()
  topic: Topic;
  public errorMessage = "";
  public TopicForm: FormGroup;
  
  constructor(private _topicDataService: TopicDataService, private _router: ActivatedRoute, private router: Router,
    private fb: FormBuilder, private _snackBar: MatSnackBar) {

     }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.TopicForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    } else {
      this.router.navigateByUrl("user/login", { skipLocationChange: true });
    }
    
  }
  onSubmit(){
    if(this.TopicForm.valid){
      this._topicDataService.postTopic(new Topic(this.TopicForm.value.title,this.TopicForm.value.description,0,null,null,null,null));
    this.openSnackBar();
      
    this.router.navigateByUrl("topic/list", { skipLocationChange: false });
    } else{
      this.errorMessage = "Please check all the fields, they are required!"
    }
  }
  openSnackBar() {
    this._snackBar.open('New topic succesfully added')._dismissAfter(3000)
  }
}
