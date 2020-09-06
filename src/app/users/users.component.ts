import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from './users.service';
import { Users } from '../Models/users.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Repos } from '../Models/repos.model';
import { ReposComponent } from './repos/repos.component';
import { Observable, Observer } from 'rxjs';
import { Router } from '@angular/router';
import { windowToggle } from 'rxjs/operators';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  UserGridColumns: string[] = [
    'Name'
  ];
  pageEvent: PageEvent;
  UsersLst: MatTableDataSource<Users>;
  Page=1;
  ErrMsg:string;
  ShwBlk:boolean=true
  constructor(private UsrSer: UsersService,
    private router: Router,
    public dialog: MatDialog, ) { 
      this.UsrSer.GetAllUsers(this.Page).subscribe(res=>{
        this.UsersLst=new MatTableDataSource<Users>(res as Users[]);
        setTimeout(() =>  this.UsersLst.paginator = this.UserGridPaginator);
     
       })
    }
  @ViewChild(MatPaginator, { static: true }) UserGridPaginator: MatPaginator;
  ngOnInit() {
   
    
  }
  GetRepos(user :Users)
  {
      this.ShowSearchResultsDialog(user)
  }
  paginationClicked(event?:PageEvent): PageEvent
  {
    if((this.UserGridPaginator.getNumberOfPages()- this.UserGridPaginator.pageIndex)==1)
    {
      this.UsrSer.GetAllUsers(this.Page+1).subscribe(res=>{
        (res as Users[]).forEach(a=>{
             this.UsersLst.data.push(a )
       })
       this.UsersLst.paginator = this.UserGridPaginator;
      })
    }
    return event
  }
  Search(){
    var Name=(document.getElementById("Name") as HTMLInputElement).value
    if(Name==null)
    {
      alert("Please enter user name")
    }
    else{
      this.UsrSer.GetUser(Name).subscribe(res=>{
        this.UsersLst=new MatTableDataSource<Users>();
        this.UsersLst.data.push(res as Users)
        this.UsersLst.paginator = this.UserGridPaginator;
        this.ShwBlk=true
      },err=>{
          this.ErrMsg="We couldn’t find any user matching  '"+Name+"'"
          this.ShwBlk=false
           })
   
    }
   
  }
  Reload()
  {
    window.location.reload()
  }
  ShowSearchResultsDialog(user :Users) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '75%';
    dialogConfig.width = '75%';
    dialogConfig.data = {
           oUser: user
    };

    const searchResultsDialog = this.dialog.open(
      ReposComponent,
      dialogConfig
    );
    searchResultsDialog.afterClosed().subscribe(result => {
     
    });
  }
 
}
