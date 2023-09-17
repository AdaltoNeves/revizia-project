import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Ivehicle } from '../model/vehicle.interface';
import { environment } from '../../environments/environment';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  constructor(private http: HttpClient) { }


  getVehicle(): Observable<Ivehicle[]> {
    return this.http.get<Ivehicle[]>(`${environment.apiURL}/vehicles`)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  createVehicle(data: any): Observable<Ivehicle[]> {
    return this.http.post<Ivehicle[]>(`${environment.apiURL}/vehicles`, data)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  updateVecicle(id: number, data: any): Observable<Ivehicle> {
    return this.http.put<Ivehicle>(`${environment.apiURL}/vehicles/${id}`, data)
      .pipe(
        catchError(this.errorHandl)
      )
  }

  deleteVecicle(id: number) {
    return this.http.delete<Ivehicle>(`${environment.apiURL}/vehicles/${id}`)
      .pipe(
        catchError(this.errorHandl)
      );
  }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(error);
  }
}
