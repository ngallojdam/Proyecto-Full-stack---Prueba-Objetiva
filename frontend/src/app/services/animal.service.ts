/* Creamos un servicio */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  endpoint = 'http://localhost:8080/api/animals';

  constructor(private httpClient: HttpClient) { }

  getAnimals(): Observable<any>{
    return this.httpClient.get<any>(this.endpoint);
  }

  addAnimal(animal: any): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, animal);
  }
  
  updateAnimal(id: number, animal: any): Observable<any> {
    return this.httpClient.put<any>(`${this.endpoint}/${id}`, animal);
  }
  
  deleteAnimal(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/${id}`);
  }
  
}