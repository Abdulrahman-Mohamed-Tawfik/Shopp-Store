import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  LoginURL = "http://localhost:7000/user/login";
  SignupURL = "http://localhost:7000/user";

  public getHeaders(): HttpHeaders {
    let token = this.getToken();
    return new HttpHeaders({ 'Authorization': 'Bearer ' + token })
  }


  signupUser(name: string, email: string, password: string, phoneNumber: string, gender: string, address: string): Observable<any> {
    return this.http.post<any>(this.SignupURL, { name, email, password, phoneNumber, gender, address }).pipe(
      catchError(err => {
        if (err.status === 401 && err.error?.error) {
          // Backend-specific error message
          return throwError(() => new Error(err.error.error));
        }
        // Generic error handling
        return throwError(() => new Error("An unexpected error occurred. Please try again later."));
      })
    );
  }


  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);


  loginUser(emails: string, passwords: string): Observable<any> {
    return this.http.post<any>(this.LoginURL, { email: emails, password: passwords }).pipe(
      tap(res => {
        localStorage.setItem('accessToken', res['access token']);
        this.tokenSubject.next(res['access token']);
      }));

  }

  logoutUser() {
    localStorage.removeItem("accessToken");
    this.tokenSubject.next(null);
  }

  getAccessToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
  getToken(): any {
    return this.tokenSubject;
  }

  isAuthorized(): boolean {
    return this.tokenSubject.value !== null;
  }

  getDecodeToken(): any {
    const token = this.tokenSubject.value;
    if (token) {
      return jwtDecode<any>(token);
    }
    else
      return null;
  }


}
