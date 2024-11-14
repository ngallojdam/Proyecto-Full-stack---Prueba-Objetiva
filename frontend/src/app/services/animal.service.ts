/* Creamos un servicio */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private endpoint = 'http://localhost:8080/api/animals';

  constructor(private httpClient: HttpClient) {}

  getAnimals() {
    return this.httpClient.get<any>(this.endpoint);
  }


  addAnimal(animal: any, photoBlob?: Blob) {
    const formData = new FormData();
    formData.append('gender', animal.gender);
    formData.append('race', animal.race);
    if (photoBlob) {
      formData.append('photo', photoBlob, 'photo.jpg');
    }
    return this.httpClient.post<any>(this.endpoint, formData);
  }

  updateAnimal(id: number, animal: any, photoBlob?: Blob) {
    const formData = new FormData();
  formData.append('gender', animal.gender);
  formData.append('race', animal.race);
  if (photoBlob) {
    formData.append('photo', photoBlob, 'animal-photo.jpg');
  }
    return this.httpClient.put(`${this.endpoint}/${id}`, animal);
  }

  deleteAnimal(id: number) {
    return this.httpClient.delete<any>(`${this.endpoint}/${id}`);
  }

  /*createAnimal(animal: any, blob: Blob) {
    let formData = new FormData();
    formData.append("gender", animal.gender);
    formData.append("race", animal.race);
    formData.append("file", blob);

    return this.httpClient.post(this.endpoint, formData);
  }*/
}