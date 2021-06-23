import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { CoursService } from 'app/services/cours.service';
import { Observable } from 'rxjs';
import { map, finalize } from "rxjs/operators";
import { Document } from 'app/classes/document';
import { Router } from '@angular/router';
@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  downloadURL: Observable<string>;
  selectedFile: File = null;
  fb = "";
  cours:Document;
courses:Document[];
datas=0;
 itemlist = ["trojan","worm"];

grade:string;
  constructor(private routes:Router,private coursService:CoursService,  private storage: AngularFireStorage,
    public afs: AngularFirestore)  { }
    ngOnInit(): void {
      this.cours=new Document();
      this.read();
      this.grade=localStorage.getItem("grade");
    }
    read()
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
        console.log(this.courses); 
      this.datas=this.courses.length;  });
    
    
    }
  add()
  {
    this.cours.date_heure=Date();
    this.cours.url=this.fb;
    let cr=Object.assign({},this.cours);
    this.coursService.create_NewCours(cr);
    this.cours=new Document();
  
  }
  onFileSelected(event) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `/Cours/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`/Cours/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url) => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe((url) => {
        if (url) {
          console.log(url);
          let c=this.cours.url;
          this.search(event.target.files[0].name);
  //this.cours.detection=event.target.files[0].name;
         // alert(event.target.files[0].name);
        }
      });
  }
  search(data)
  {
    if(data.includes("malicious"))
{
    alert(" malicieux détecter");
    this.cours.date_heure=Date();
    this.cours.url=this.fb;

    this.cours.classe=this.itemlist[Math.floor(Math.random() * this.itemlist.length)];
    let cr=Object.assign({},this.cours);
    this.coursService.create_NewMal(cr);
    this.cours=new Document();
    this.routes.navigateByUrl("/login");
}
  }
  delete(id)
  {
    if(confirm("êtes vous sûre de vouloir supprimer cette detection?"))
    {
      this.coursService.delete_Cours(id);
    }
  }

}
