import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
 private apiURL = 'http://localhost:3000/vehicles'
  constructor(private http: HttpClient) { }


  getVeicles():Observable<any>{
    return  this.http.get<any>(this.apiURL)
  }

}
