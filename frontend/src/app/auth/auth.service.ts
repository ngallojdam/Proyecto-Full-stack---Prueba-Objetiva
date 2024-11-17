import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { tap } from 'rxjs/operators';

export interface AuthResponse {
  token: string;
}

export interface User {
  username: string;
  email?: string; 
  password: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private initializedStorage: boolean = false;
  private AUTH_SERVER_ADDRESS: string = 'http://localhost:4000';

  constructor(private httpClient: HttpClient, private storage: Storage) { 
    this.initializeStorage();
  }

  // Inicializar el almacenamiento
  private async initializeStorage() {
    if (!this.initializedStorage) await this.storage.create();
    this.initializedStorage = true;
  }

  // Verificar si el almacenamiento está inicializado
  isInitializedStorage() {
    return this.initializedStorage;
  }

  // Obtener las opciones de autenticación
  private getOptions(user: User) {
    const base64UserAndPassword = window.btoa(user.username + ":" + user.password);
    const basicAccess = 'Basic ' + base64UserAndPassword;
    return {
      headers: {
        'Authorization': basicAccess,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };
  }

  // Registro de un nuevo usuario
  register(userDetails: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.AUTH_SERVER_ADDRESS}/api/users/`, 
      userDetails,
      this.getOptions(userDetails)
    );
  }

  // Inicio de sesión de un usuario
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(
      `${this.AUTH_SERVER_ADDRESS}/api/users/signin`,
      credentials,
      this.getOptions(credentials)
    ).pipe(
      tap(async (res: AuthResponse) => {
        if (res.token) {
          await this.storage.set("token", res.token);
        }
      })
    );
  }

  // Cerrar sesión
  async logout() {
    await this.storage.remove("token");
  }

  // Verificar si el usuario está logueado
  async isLoggedIn(): Promise<boolean> {
    const token = await this.storage.get("token");
    return !!token;
  }

  // Guardar el token en el almacenamiento local
  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
