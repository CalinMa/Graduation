import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service'; 
import { User } from 'src/app/models/user'; 
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data: User[] = [];
  displayedColumns: string[] = ['name', 'firstName', 'userName',  'email', 'role', 'operations'];
  isSuperAdmin = false;
  userRole: string = "";
 

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.findUserName();
    if(this.userRole == "superadmin"){
      this.isSuperAdmin = true;
    }
    this.usersService.getUsers().subscribe(data => {
      this.data = data;
    })
  }

  findUserName(){
    const token =  localStorage.getItem("token") != null ? localStorage.getItem("token") : ""
    const tokenDecoded = this.getDecodedAccessToken(token)
    this.userRole = tokenDecoded.userRole
   
  }

  getDecodedAccessToken(token: any): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }
  deleteUserItem(user: User) {
    this.usersService.deleteUser(user).subscribe(() => {
      this.data = this.data.filter(u => u.id !== user.id);
    })
  }

  updateUserItem(user: User) {
    this.usersService.updateUser(user).subscribe(() => {
      this.usersService.getUsers().subscribe(data => {
        this.data = data;
      })
    });
  }

}
