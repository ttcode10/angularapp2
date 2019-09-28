import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[];

  constructor() {
    this.users = [
      {
        firstName: 'Mike',
        lastName: 'Miller',
        email: 'mike@gmail.com',
        joinDate: new Date('2019-01-05 08:30:24'),
        hide: true
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john@gmail.com',
        joinDate: new Date('2019-03-20 09:17:39'),
        hide: true
      }
    ];
  }

  getUsers():Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User) {
    this.users.unshift(user);
  }


}
