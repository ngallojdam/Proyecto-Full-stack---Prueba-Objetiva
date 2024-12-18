import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Servicio de autenticación que debes crear

interface LoginResponse {
    success: boolean;
    message?: string; // Si la respuesta incluye un mensaje de error
  }

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginData).subscribe((response: LoginResponse) => {
      if (response.success) {
        // Redirigir al usuario a la página principal o donde sea necesario
        this.router.navigate(['/home']);
      } else {
        // Mostrar un mensaje de error si la autenticación falla
        alert(response.message || 'Credenciales incorrectas');
      }
    },
    error => {
        alert('Ocurrió un error al intentar iniciar sesión');
      }
    );
  }
}
