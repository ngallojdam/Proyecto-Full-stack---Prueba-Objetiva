import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/login';  // Cambia la URL según tu backend

  constructor(private http: HttpClient) {}

  /* login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials);
  }
  */
  login(loginData: { email: string; password: string }): Observable<any> {
    console.log("Enviando datos de login:", loginData); // Verifica los datos antes de enviarlos
    return this.http.post<any>(this.apiUrl, loginData);
  }

  // Método para comprobar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');  // Verifica si hay token en el almacenamiento local
  }

  // Método para obtener los encabezados con el token
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  // Obtener usuarios (este es un ejemplo de cómo podrías hacerlo)
  getUsers(): any[] {
    // Aquí iría una llamada a la API para obtener los usuarios
    return [{ username: 'Juan', email: 'juan@example.com' }];
  }
}
