import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Users } from '../Models/users.model';
//import { userInfo } from 'os';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Repos } from '../Models/repos.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public http: HttpClient) { }
  
  Url:string="https://api.github.com/"
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      alert(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  GetAllUsers(Page)
  {
    return this.http.get(this.Url +'users?per_page=100&page='+Page);
  }
  GetUser(User)
  {
    return this.http.get(this.Url +'users/'+User);
  }
  GetUserRepos(User :string,page)
  {
      return this.http.get(this.Url +'users/'+User+'/repos?per_page=100&page='+page);
  }
  
  
}
