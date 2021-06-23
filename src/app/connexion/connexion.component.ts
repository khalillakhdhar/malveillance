import { Component, OnInit } from '@angular/core';
import { UserService } from 'app/services/user.service';
import { User } from '../classes/user';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {
  user:User;
  users:User[];
  b=false;
  constructor(private userService:UserService) { }
  
  ngOnInit(): void {
    localStorage.clear();
    this.user=new User();
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
      console.log(this.users);
  
    });
  
  
  }
  verif()
  {
  for(let us of this.users)
  {
  if((us.login==this.user.login)&&(us.mdp==this.user.mdp))
  {
    localStorage.setItem("grade",us.grade);
    localStorage.setItem("id",us.id);
  window.location.replace("/#/dashboard");
  this.b=true;
  
  
  }
  
  }
  if(!this.b)
  alert("compte non reconnu!");
  
  
  }
}
