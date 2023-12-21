import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../Model/User";
import {UserServiceService} from "../../../services/user-service.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {EditUserDialogComponent} from "../../dialogs/edit-user-dialog/edit-user-dialog.component";
import {ConfirmDialogComponent} from "../../dialogs/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent  implements  OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource! : MatTableDataSource<User>
  users : User[]=[]
  displayedColumns: string[] = ['id', 'name','role', 'email', 'edit', 'delete'];
  constructor(private userService: UserServiceService,
              private dialog: MatDialog
              ) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe((data: any)=>{
      this.users = data.data;
      this.dataSource = new MatTableDataSource(this.users);
        this.dataSource.paginator = this.paginator;
      }
    )

  }


  editUser(user:User) {
   let Ref = this.dialog.open(EditUserDialogComponent, {
      data: user,
      width: '600px',
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.getUsers();
      }
    })
  }

  deleteUser(user:User) {
    let Ref = this.dialog.open(ConfirmDialogComponent, {
      data: "Are you sure you want to delete this user ?",
    })
    Ref.afterClosed().subscribe((result)=>{
      if (result) {
        this.userService.deleteUser(user.id).subscribe((data: any)=>{
          this.getUsers();
        },
          (error)=>{
            console.log(error);
          }
        )
      }
    })
    }

}
