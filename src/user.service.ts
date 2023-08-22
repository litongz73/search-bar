import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get('https://reqres.in/api/users?page=2').pipe(
      map((result: any) => {
        return result.data.map((each: any) => {
          return {
            name: each.first_name + ' ' + each.last_name,
            avatar: each.avatar,
          };
        });
      })
    );
  }
}
