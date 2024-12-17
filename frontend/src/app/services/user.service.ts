import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';


  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Obtener un usuario por ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo usuario
  create(data: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);  // Ruta correcta
  }
  

  // Actualizar un usuario
  update(id: number, data: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  // Eliminar un usuario
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
