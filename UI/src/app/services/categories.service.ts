import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }
  categoryURL = "http://localhost:7000/category";
    staticfilesURL = 'http://localhost:7000/images/'
    getCategories(): Observable<any> {
      return this.http.get<any>(this.categoryURL);
    }
}
