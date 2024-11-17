import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  // Registrar al usuario
  register() {
    if (this.registerForm.invalid) {
      return;
    }

    const { username, email, password } = this.registerForm.value;
    const userDetails = { username, email, password };

    this.authService.register(userDetails).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error en el registro:', error);
        alert('No se pudo completar el registro. Inténtalo nuevamente.');
      }
    );
  }
}
