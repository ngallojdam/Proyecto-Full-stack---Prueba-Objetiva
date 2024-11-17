import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  endpoint = 'http://localhost:8080/api/animals';

  constructor(private httpClient: HttpClient) {}

  // Obtener lista de animales
  getAnimals(token: string): Observable<any> {
    const headers = { 'Authorization': 'Bearer ' + token };
    return this.httpClient.get(this.endpoint, { headers });
  }
  /*getAnimals() {
    return this.httpClient.get<any>(this.endpoint);
  }*/

  // Agregar un animal
  addAnimal(formData: FormData): Observable<any> {
    return this.httpClient.post(this.endpoint, formData);
  }

  // Actualizar un animal existente
  updateAnimal(id: number, animal: any, photoBlob?: Blob): Observable<any> {
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
