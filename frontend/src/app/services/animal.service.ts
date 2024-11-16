/* Creamos un servicio */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private endpoint = 'http://localhost:8080/api/animals';

  constructor(private httpClient: HttpClient) {}

  // Obtener lista de animales
  getAnimals(): Observable<any> {
    return this.httpClient.get<any>(this.endpoint);
  }

  // Agregar un animal
  addAnimal(animal: any, photoBlob?: Blob) {
    const formData = new FormData();
    const url = `${this.endpoint}/create`;

    formData.append('gender', animal.gender);
    formData.append('race', animal.race);

    if (photoBlob) {
      formData.append('photo', photoBlob, 'animal-photo.jpg');
    }

    return this.httpClient.post<any>(url, formData);
  }

  // Actualizar un animal existente
  updateAnimal(id: number, animal: any, photoBlob?: Blob) {
    const formData = new FormData();
    const url = `${this.endpoint}/${id}`;

    formData.append('gender', animal.gender);
    formData.append('race', animal.race);

    if (photoBlob) {
      formData.append('photo', photoBlob, 'animal-photo.jpg');
    }

    return this.httpClient.put<any>(url, formData);
  }

  // Eliminar un animal
  deleteAnimal(id: number) {
    const url = `${this.endpoint}/${id}`;
    return this.httpClient.delete<any>(url);
  }
}
