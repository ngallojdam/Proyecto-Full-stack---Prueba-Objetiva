import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const { username, password } = this.loginForm.value;
    const credentials = { username, password};
    
    this.authService.login(credentials).subscribe(
      (response) => {
        console.log('Token recibido:', response.token); // Agrega esta línea para ver el token
        if (response.token) {
          this.authService.saveToken(response.token);
          this.router.navigate(['/my-animals']);
        } else {
          console.error('Error: No se recibió un token');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Credenciales incorrectas o servidor no disponible.');
      }
    );
  }
}  