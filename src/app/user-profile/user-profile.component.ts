import { Component, OnInit } from '@angular/core';
import { User } from 'app/classes/user';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id:string;
  grade:string;
  
  user:User;
  users:User[];
  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
    this.user=new User();
    this.id=localStorage.getItem("id");
    this.read();
  }
  read()
  {
  this.userService.read_Users().subscribe(data => {
  
    this.users = data.map(e => {
      return {
        id: e.payload.doc.id,

        nom: e.payload.doc.data()["nom"],
        tel: e.payload.doc.data()["tel"],
        grade: e.payload.doc.data()["grade"],
        login: e.payload.doc.data()["login"],
        mdp: e.payload.doc.data()["mdp"],
        adresse: e.payload.doc.data()["adresse"],
        ipref: e.payload.doc.data()["ipref"],
  
  
  
      };
    });
    for (let u of this.users)
  {
  if((u.id==this.id))
  {
console.log("actuelle",u);
this.user=u;

  
  }
  
  
  }
  console.log("user",this.user);

    console.log("liste",this.users);
  
  });
  
  
  
  }
  update()
  {
    let us=Object.assign({},this.user);
  this.userService.update_User(this.id,us);
  alert("updated successfully");
  
  
  }
}
