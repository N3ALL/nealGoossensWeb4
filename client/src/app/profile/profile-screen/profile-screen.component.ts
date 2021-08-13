import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Topic } from 'src/app/topic/topic.model';
import { Profile } from '../profile.model';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-profile-screen',
  templateUrl: './profile-screen.component.html',
  styleUrls: ['./profile-screen.component.css']
})
export class ProfileScreenComponent implements OnInit {
  public profile: Profile;
  public user: FormGroup;
  public disableFields: boolean = true;
  public showButton: boolean = false;
  public errorMessage: string = '';
  private _topics$: Observable<Topic[]>;
  public emptyList: string = ""
  constructor(private authService: UserDataService,
    private router: Router, private fb: FormBuilder, private _snackBar: MatSnackBar) {
      var x = this.authService.getProfile();
      if (x != null){
        x.subscribe(value => this.profile = value);
        if (!localStorage.getItem('currentUser')){
          this.router.navigateByUrl("user/login", { skipLocationChange: true });
        } else {
          this._topics$ = this.authService.getUserTopics(null, true);
          this.noTopics();
          
        }
      } else {
        router.navigateByUrl("user/login");
      }
      
     }
     get topics$(): Observable<Topic[]> {
      return this._topics$;
    }
  ngOnInit(): void {
    this.user = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      institution: [''],
      fieldOfStudy: [''],
      emailAdress: ['']
    });
    this.manageInput();
   
}

  
  logOut(): void {
    this.authService.logout();
    this.openSnackBarLoggOff();
    this.router.navigateByUrl("topic/list", { skipLocationChange: true });
  }
  manageInput(){
    if (this.disableFields){
      this.showButton = false; 
      this.user.reset();
      this.fillFields();
      this.user.disable()
    } else {
      this.showButton = true;
      
      this.user.enable()
      this.user.get('emailAdress').disable()
    }
  }

  public count(): number{
    // var x;
    // this._topics$.subscribe(value => x = value.length.toString())
    return 0;
  }
  fillFields(){
    this.user.get('username').setValue(this.profile?.username);
    this.user.get('firstname').setValue(this.profile?.surname)
    this.user.get('lastname').setValue(this.profile?.name)
    this.user.get('institution').setValue(this.profile?.institution)
    this.user.get('fieldOfStudy').setValue(this.profile?.fieldOfStudy)
    this.user.get('emailAdress').setValue(this.profile?.emailAdress)
    
  }
  editButton(){
    if (this.disableFields){
      this.disableFields = false;
      this.fillFields();
      this.manageInput();
    } else {
      this.disableFields = true;
      this.manageInput();
    }
  }
  onSubmit() {
    this.user.get('emailAdress').enable()
    if (this.user.valid){
      this.authService.editProfile(
        this.user.value.firstname,
        this.user.value.lastname,
        this.user.value.username,
        this.user.value.institution,
        this.user.value.fieldOfStudy,
        this.user.value.emailAdress,
        )
        this.editSuccesSnackBar();
        this.user.disable()
      this.errorMessage = '';

    } else {
      this.errorMessage = 'username, firstname and lastname are required fields';
    }
  }
  noTopics(): void{
    var x;
    this.topics$.subscribe()
    
    if (x == 0){
      this.emptyList = "You don't have any topics yet";
    } else {
      this.emptyList = "";
    }
  }
  openSnackBarLoggOff() {
    this._snackBar.open('Succesfully logged off!')._dismissAfter(3000)
  }
  editSuccesSnackBar(){
    this._snackBar.open('Profile succesfully changed')._dismissAfter(3000)
  }
}
