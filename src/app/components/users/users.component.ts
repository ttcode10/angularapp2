import { User } from './../../models/user';
import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModel, NgForm, FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    joinDate: null,
    hide: false
  };

  isLoaded: boolean = false;

  @ViewChild('userForm', {static: false}) form: any;
  newUser: User;

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.isLoaded = true;
    });
  }

  onSubmit() {
    this.userService.addUser({...this.user, joinDate: new Date()});
    this.form.reset();
  }

}
