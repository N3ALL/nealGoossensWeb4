import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic } from 'src/app/topic/topic.model';
import { Profile } from '../profile.model';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-guest-profile-screen',
  templateUrl: './guest-profile-screen.component.html',
  styleUrls: ['./guest-profile-screen.component.css']
})
export class GuestProfileScreenComponent implements OnInit {
  errorMessage = "";
  public profile: Profile;
  private _topics$: Observable<Topic[]>;
  boolean: boolean = false;
  constructor(private _router: ActivatedRoute, private authService: UserDataService) {
    
    
   }
   get topics$(): Observable<Topic[]> {
    return this._topics$;
  }
  ngOnInit() {
    this.authService.getProfileForVisitor(this._router.snapshot.params.id, this._router.snapshot.params.boolean).subscribe(async value => await this.getProfileTopics(value));
  }

  async getProfileTopics(value: any){
    this.profile = value;
    this._topics$ = this.authService.getUserTopics(this.profile?.emailAdress, false);
    
  }
}
