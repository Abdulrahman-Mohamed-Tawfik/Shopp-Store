import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsertypesService {
  constructor(private http: HttpClient, private _authS: AuthService) { }

  usertypeURL = "http://localhost:7000/userType";

  

  getUserTypes(): Observable<any> {
    const headers = this._authS.getHeaders();
    console.log("headerssssss: ",headers);

    return this.http.get<any>(this.usertypeURL, { headers });
  }

  getUserTypeById(id: object): Observable<any> {
    const headers = this._authS.getHeaders();

    return this.http.get<any>(`${this.usertypeURL}/${id}`, { headers });
  }

  createUserType(userType: any): Observable<any> {
    const headers = this._authS.getHeaders();
    return this.http.post<any>(this.usertypeURL, userType, { headers });
  }

  deleteUserType(userTypeId: any): Observable<any> {
    const headers = this._authS.getHeaders();
    // console.log("headerssssss: ",headers);
    
    return this.http.delete<any>(`${this.usertypeURL}/${userTypeId}`, { headers });
  }
}
