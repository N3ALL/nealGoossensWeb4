import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TopicListComponent } from 'src/app/topic/topic-list/topic-list.component';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {
  
  public user: FormGroup;
  public errorMessage: string = '';
  constructor(
    private authService: UserDataService,
    private router: Router,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  onSubmit() {
    if (this.user.valid){
      this.authService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        (val) => {
          if (val) {
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              this.openSnackBar();
              this.router.navigate(['/topic/list']);
            }
          } else {
            this.errorMessage = `Could not login`;
          }
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.errorMessage = `Error while trying to login user ${this.user.value.username}: ${err.error.message}`;
          } else {
            this.errorMessage = "This email and password combination is not correct";
          }
        }
      );
    } else {
      this.errorMessage = "Please fill all the fields."
    }
    
}
openSnackBar() {
  this._snackBar.open('Succesfully logged in')._dismissAfter(3000)
}

}
