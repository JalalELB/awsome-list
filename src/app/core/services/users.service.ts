import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/shared/models/user';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {


  constructor(private http: HttpClient) { }


  public save(user: User, jwt: string): Observable<User | null> {
    const url = `${environment.firebase.firestore.baseURL}/users?key=${environment.firebase.apiKey}`;
    const data = this.getDataForFirestore(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      })
    };
    return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        return of(this.getUserFromFirestore(data.fields));
      })
    );
  }


  public update(user: User): Observable<User | null> {
    const url = `${environment.firebase.firestore.baseURL}/users/${environment.firebase.apiKey}&documentId=${user.id}`;
    const data = this.getDataForFirestore(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      })
    };
    return this.http.patch(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        return of(this.getUserFromFirestore(data.fields));
      })
    );
  }


  public get(userId: string, jwt: string): Observable<User | null> {
    const url = `${environment.firebase.firestore.baseURL}:runQuery?key=${environment.firebase.apiKey}`;
    const data = this.getStructuredQuery(userId);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      })
    };
    return this.http.post(url, data, httpOptions).pipe(
      switchMap((data: any) => {
        return of(this.getUserFromFirestore(data[0].document.fields));
      })
    );
  }


  private getStructuredQuery(userId: string): Object {
    return {
      structuredQuery: {
        from: [{
          collectionId: 'users'
        }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'id' },
            op: 'EQUAL',
            value: { stringValue: userId }
          }
        },
        limit: 1
      }
    };
  }


  private getUserFromFirestore(fields: any): User {
    return new User({
      id: fields.id.stringValue,
      email: fields.email.stringValue,
      pomodoroDuration: fields.pomodoroDuration.integerValue,
      name: fields.name.stringValue,
      avatar: fields.avatar.stringValue,
    });
  }


  private getDataForFirestore(user: User): Object {
    return {
      fields: {
        id: { stringValue: user.id },
        email: { stringValue: user.email },
        name: { stringValue: user.name },
        avatar: { stringValue: user.avatar },
        pomodoroDuration: { integerValue: user.pomodoroDuration }
      }
    };
  }


}
