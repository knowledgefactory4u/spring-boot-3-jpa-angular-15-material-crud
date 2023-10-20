import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from './service/student.service';
import { StudentAddUpdateComponent } from './student-add-update/student-add-update.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'age',
    'gender',
    'qualification',
    'grade',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentService,
  ) {}

  ngOnInit(): void {
    this.getStudentList();
  }

  openStudentAddUpdateForm() {
    const dialogRef = this._dialog.open(StudentAddUpdateComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      },
    });
  }

  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteStudent(id:number){
    if (window.confirm('Do you want to go ahead?')) {
    this._studentService.deleteStudent(id).subscribe({
      next: (res) => {
        this.getStudentList();
      },
      error: console.log,
    });
   }
  }
  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddUpdateComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      },
    });
  }
}