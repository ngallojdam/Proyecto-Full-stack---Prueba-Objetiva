import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private endpoint = 'http://localhost:8080/api/users'; // Ruta del backend


  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.endpoint);
  }

  // Obtener un usuario por ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  // Crear un nuevo usuario
  create(data: User): Observable<any> {
    return this.http.post(`${this.endpoint}/register`, data);  // Ruta correcta
  }
  

  // Actualizar un usuario
  update(id: number, data: User): Observable<any> {
    return this.http.put(`${this.endpoint}/${id}`, data);
  }

  // Eliminar un usuario
  delete(id: number): Observable<any> {
    // Obtener el token JWT del almacenamiento local
    const token = localStorage.getItem('token');  // O sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token no encontrado. El usuario no está autenticado.');
    }

    // Crear los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Incluye el token en la cabecera Authorization
    });

    // Realizar la solicitud DELETE con el token
    return this.http.delete(`${this.endpoint}/${id}`, { headers });
  }
}
