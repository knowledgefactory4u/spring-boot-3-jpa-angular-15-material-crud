import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private _http:HttpClient) { }

  addStudent(data: any): Observable<any> {
    return this._http.post('http://localhost:8080/api/v1/students', data);
  }

  updateStudent(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:8080/api/v1/students/${id}`, data);
  }

  getStudentList(): Observable<any> {
    return this._http.get('http://localhost:8080/api/v1/students');
  }

  deleteStudent(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8080/api/v1/students/${id}`);
  }

}
