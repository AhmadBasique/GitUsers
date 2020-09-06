import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Users } from 'src/app/Models/users.model';
import { UsersService } from '../users.service';
import { Repos } from 'src/app/Models/repos.model';
@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent  {
 UserGridColumns: string[] = [
    'Name'
  ];
  Page=1
 // pageEvent: PageEvent;
  ReposLst: MatTableDataSource<Repos>;
  Image:string
  UserName:string;
  User:Users;
  @ViewChild(MatPaginator, { static: true }) ReposGridPaginator: MatPaginator;
 

  constructor(
    private dialogRef: MatDialogRef<ReposComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    public UsrSer:UsersService  ) {
    if (data) {
    this.PopulateRepository(data.oUser)
    }
  }
  PopulateRepository(user:Users)
  {
  this.Image=user.avatar_url
  this.UserName=user.login;
  this.UsrSer.GetUserRepos(user.login,this.Page).subscribe(res=>{
  this.ReposLst=new MatTableDataSource<Repos>(res as Repos[]);
  //this.ReposLst.data.forEach(aa=>{
    // })
       this.ReposLst.paginator = this.ReposGridPaginator;
  })
  this.UsrSer.GetUser(this.UserName).subscribe(res=>{
      this.User=(res as Users)
  })
  }
  paginationClicked(event?:PageEvent): PageEvent
  {
 
    if((this.ReposGridPaginator.getNumberOfPages()- this.ReposGridPaginator.pageIndex)==1)
    {
      this.UsrSer.GetUserRepos(this.UserName,this.Page+1).subscribe(res=>{
        (res as Repos[]).forEach(a=>{
             this.ReposLst.data.push(a )
            
       })
       this.ReposLst.paginator = this.ReposGridPaginator;
      })
    } 
    return event
  }
}
