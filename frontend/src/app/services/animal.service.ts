// /* Creamos un servicio */

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Animal } from '../models/animal.model';

// const baseUrl = 'http://localhost:8080/api/animals';

// @Injectable({
//   providedIn: 'root'
// })
// export class AnimalService {

//   constructor(private httpClient: HttpClient) { }

//   getAll(): Observable<Animal>{
//     return this.httpClient.get<any>(baseUrl);
//   }

//   get(id: any): Observable<Animal> {
//     return this.httpClient.get(`${baseUrl}/${id}`);
//   }

//   create(animal: any): Observable<any> {
//     return this.httpClient.post<any>(baseUrl, animal);
//   }
  
//   update(id: number, animal: any): Observable<any> {
//     return this.httpClient.put(`${baseUrl}/${id}`, animal);
//   }

//   delete(id: any): Observable<any> {
//     return this.httpClient.delete(`${baseUrl}/${id}`);
//   }
  
//   deleteAll(): Observable<any> {
//     return this.httpClient.delete(baseUrl);
//   }
  
//   findByAnimal(animal: any): Observable<Animal[]> {
//     return this.httpClient.get<Animal[]>(`${baseUrl}?animal=${animal}`);
//   }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private endpoint = 'http://localhost:8080/api/animals';

  constructor(private httpClient: HttpClient) { }

  // Obtener la lista de animales
  getAnimals(): Observable<any> {
    return this.httpClient.get<any>(this.endpoint);
  }

  // Añadir un nuevo animal
  addAnimal(animal: any): Observable<any> {
    return this.httpClient.post<any>(this.endpoint, animal);
  }

  // Actualizar un animal existente
  updateAnimal(id: number, animal: any): Observable<any> {
    return this.httpClient.put<any>(`${this.endpoint}/${id}`, animal);
  }

  // Eliminar un animal
  deleteAnimal(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.endpoint}/${id}`);
  }
}
