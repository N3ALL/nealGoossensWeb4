import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Topic } from '../topic/topic.model';
import { Profile } from './profile.model';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Token = token.split('.')[1];
  const base64 = base64Token.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _reloadTopics$ = new BehaviorSubject<boolean>(true);

  editProfile(firstname: string, lastname: string, username: string, institution: string, fieldOfStudy: string, email: string) {
    
    this.http.put(
      `${environment.apiUrl}/UserLogin/editProfile`,
      { firstname, lastname, username, institution, fieldOfStudy, email }).subscribe()
  }
  private readonly _tokenKey = 'currentUser';
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string = null;

  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.unique_name
    );
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post(
        `${environment.apiUrl}/UserLogin`,
        { email, password },
        { responseType: 'text' }
      )
      .pipe(
        map((token: any) => {
          if (token) {
            // console.log(token)
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            return true;
          } else {
            
            return false;
          }
        })
      );
  }

  deleteTopic(id: number){
    console.log(id);
    this.http.delete(`${environment.apiUrl}/Topic/deleteTopic/${id}/${localStorage.getItem('currentUser')}`).subscribe(() => {
      this._reloadTopics$.next(true);
    });
  }
  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    institution: string,
    fieldOfStudy: string,
    username: string,
  ): Observable<boolean> {
    
    return this.http
      .post(`${environment.apiUrl}/UserLogin/register`,
        {
          email,
          password,
          firstName,
          lastName,
          username,
          institution,
          fieldOfStudy,
          passwordConfirmation: password
        },
        { responseType: 'text' }
        
      ).pipe(
        map((token: any) => {
          if (token) {
            localStorage.setItem(this._tokenKey, token);
            this._user$.next(email);
            
            return true;
          } else {
            // map((res: Response) => {
            //   if (res){
            //     console.log(res)
            //   } else {
            //     console.log("error");
            //   }
            // });
            return false;
          }
        })
      );
  }

  getProfile(): Observable<Profile> {
    var token = localStorage.getItem('currentUser');
    if (token){
      return this.http.get<Profile>(`${environment.apiUrl}/UserLogin/getProfile/${token}`);
    } else {
      return null
    }
    
  }
  getUserTopics(email: string, boolean: boolean): Observable<Topic[]>{
    if (email == null && boolean){
      var token = localStorage.getItem('currentUser');
      return this._reloadTopics$.pipe(switchMap(() => this.http.get<Topic[]>(`${environment.apiUrl}/Topic/userTopics/${token}`,
      ).pipe(map((r: any[]) => r.map(Topic.fromJSON)))));
    } else {
      
      return this._reloadTopics$.pipe(switchMap(() => this.http.get<Topic[]>(`${environment.apiUrl}/Topic/userTopicsVisitor/${email}`,
      ).pipe(map((r: any[]) => r.map(Topic.fromJSON)))));
    }
    
    
  }

  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem('currentUser');
      this._user$.next(null);
    }
  }

  getProfileForVisitor(id: number, boolean: string): Observable<Profile>{
    if (boolean == "true" ) return this.http.get<Profile>(`${environment.apiUrl}/UserLogin/visitProfileThroughReply/${id}`);
    else return this.http.get<Profile>(`${environment.apiUrl}/UserLogin/visitProfileThroughTopic/${id}`);
  }


  handleError(error: HttpErrorResponse): Observable<never> {
    var errorMessage = "Problem when trying to connect to server."
    return throwError(errorMessage);
  }
  checkUserNameAvailability = (email: string): Observable<boolean> => {
    return this.http.get<boolean>(
      `${environment.apiUrl}/UserLogin/:email`,
      {
        params: { email },
      }
    );
  };
}
