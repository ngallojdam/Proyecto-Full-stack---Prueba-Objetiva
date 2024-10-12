import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Animal } from '../models/animal.model';  // Importa el modelo Animal

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private apiUrl = 'http://localhost:8080/api/animals';  

  constructor(private http: HttpClient) { }

  // POST: Añadir un nuevo animal
  createAnimal(animal: Animal): Observable<any> {
    return this.http.post(this.apiUrl, animal);
  }

  // PUT: Actualizar un animal existente
  updateAnimal(id: number, animal: Animal): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, animal);
  }

  // DELETE: Borrar un animal
  deleteAnimal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // GET: Obtener todos los animales
  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }
}