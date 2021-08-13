import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../user-data.service';
var x;
var booltest = false;

function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): ValidationErrors => {
    if (!control.value) {
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);
    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

function comparePasswords(control: AbstractControl): ValidationErrors {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password.value === confirmPassword.value){
    // passwordError(true)
    booltest = false;
    
    return null
  } else {
    booltest = true;
    // passwordError(false)
    
    return { passwordsDiffer: true }
  }
  
}
// function passwordError(y :boolean): void{
//   if (y){
    
//     console.log(y)
//     RegisterScreenComponent.prototype.errorMessagePassword = ''
//   } else {
    
//     console.log(y)
//     RegisterScreenComponent.prototype.errorMessagePassword = 'passwords are not the same'
//   }
// }

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> => {
    return checkAvailabilityFn(control.value).pipe(
      map((available) => {
        if (available) {
          x = false
          return null;
        }
        x = true
        return { userAlreadyExists: true };
      })
    );
  };
}
@Component({
  selector: 'app-register-screen',
  templateUrl: './register-screen.component.html',
  styleUrls: ['./register-screen.component.css']
})

export class RegisterScreenComponent implements OnInit {
  public errorMessagePassword: string = '';
  public user: FormGroup;
  public userAlreadyExists;
  
  public errorMessage: string = '';
  constructor(
    private authService: UserDataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      institution: [''],
      fieldofstudy: [''],
      email: [
        '',
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability),
      ],
      password: ['',
            [
              Validators.required,
              Validators.minLength(8),
              patternValidator(/\d/, { hasNumber: true }),
              patternValidator(/[A-Z]/, { hasUpperCase: true }),
              patternValidator(/[a-z]/, { hasLowerCase: true }),
            ],
          ],
          confirmPassword: ['', Validators.required],
        },
        { validator: comparePasswords },
    );
  }

  onSubmit() {
    if(!booltest){
      if(this.user.valid){
        this.authService
        .register(
          this.user.value.firstname,
          this.user.value.lastname,
          this.user.value.email,
          this.user.value.password,
          this.user.value.institution,
          this.user.value.fieldofstudy,
          this.user.value.username,
        )
        .subscribe(
          (val) => {
            if (val) {
              if (this.authService.redirectUrl) {
                this.router.navigateByUrl(this.authService.redirectUrl);
                this.authService.redirectUrl = undefined;
              } else {
                this.router.navigate(['./topic/list']);
              }
            } else {
              this.errorMessage = `Could not login`;
            }
          },
          (err: HttpErrorResponse) => {
            console.log(err);
            if (err.error instanceof Error) {
              this.errorMessage = `Error while trying to login user ${this.user.value.email}: ${err.error.message}`;
            } else {
              this.errorMessage = `This email has already been used`;
            }
          }
        );
      } else {
        this.errorMessage = 'Oops, something went wrong. Please check all the fields'
      }
    } else {
      this.errorMessagePassword = 'Password and passwordconfirmation are not the same.'
    }

        
        
       }
    }
