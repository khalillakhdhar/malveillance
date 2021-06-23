import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/classes/user';
import { CoursService } from 'app/services/cours.service';
import { UserService } from 'app/services/user.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cours:Document;
  malwares:any;
  courses:any;
  datas=0;
  datas2=0;
  date:any;
  user:User;
  users:User[];
  b=false;
  constructor(private userService:UserService, private routes:Router,private coursService:CoursService) { }
  
  printing()
  {
window.print();


  }
  reading()
    {
      this.coursService.read_Mal().subscribe(data => {
    
        this.malwares = data.map(e => {
          return {
            id: e.payload.doc.id,
  
            date_heure: e.payload.doc.data()["date_heure"],
            url: e.payload.doc.data()["url"],
            detection: e.payload.doc.data()["detection"],
            description: e.payload.doc.data()["description"],
            classe: e.payload.doc.data()["classe"],
            
    
    
          };
        });
        console.log("malwares",this.malwares); 
      this.datas=this.malwares.length;  });
    }
  readall()
    {
      this.coursService.read_Cours().subscribe(data => {
    
        this.courses = data.map(e => {
          return {
            id: e.payload.doc.id,
  
            date_heure: e.payload.doc.data()["date_heure"],
            url: e.payload.doc.data()["url"],
            detection: e.payload.doc.data()["detection"],
            description: e.payload.doc.data()["description"],
            classe: e.payload.doc.data()["classe"],
            
    
    
          };
        });
        console.log(this.malwares); 
      this.datas2=this.malwares.length;  });
    }
  ngOnInit() { 
    this.date=Date.now();
    this.reading();
    this.readall();
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    

    
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
}
