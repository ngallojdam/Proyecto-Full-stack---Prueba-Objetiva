import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router'; 
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';  // Importar el servicio de autenticación

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  isLoggedIn: boolean = false;  // Estado de si el usuario está logueado
  users: any[] = [];
  newUser: User = { id: 0, name: '', email: '', password: '' };
  loginData = { email: '', password: '' };  // Datos del formulario de login
  loginError: string = '';  // Mensaje de error para el login

  constructor(
    private userService: UserService,
    private authService: AuthService,  // Inyectar el servicio de autenticación
    private router: Router,
    private alertController: AlertController  
  ) {}

  ngOnInit() {
    this.checkLoginStatus(); 
    this.loadUsers(); 
    }
// Verificar si el usuario está logueado
checkLoginStatus() {
  this.isLoggedIn = this.authService.isAuthenticated();

  }

 
 // Realizar login
 login() {
  console.log(this.loginData); // Imprime el objeto loginData para verificar
  this.authService.login(this.loginData).subscribe(
    response => {
      localStorage.setItem('token', response.token);  // Guardar token en localStorage
      this.isLoggedIn = true;  // Cambiar el estado a logueado
      this.loginError = '';  // Limpiar errores
      this.router.navigate(['/usuarios']);  // Redirigir a la página de usuarios (si es necesario)
    },
    error => {
      this.loginError = 'Correo o contraseña incorrectos';  // Mostrar error en caso de fallo
      console.error(error);
    }
  );
}

// Cargar la lista de usuarios (solo si está logueado)
loadUsers() {
  if (this.isLoggedIn) {
    // Aquí cargamos la lista de usuarios de alguna API, por ejemplo:
    this.users = this.authService.getUsers();
  }
}
  // Crear un nuevo usuario
  createUser() {
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      alert('Todos los campos son obligatorios.');
      return;
    }
    this.userService.create(this.newUser).subscribe(
      () => {
        this.loadUsers();
        this.newUser = { id: 0, name: '', email: '', password: '' };
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        alert('Hubo un error al crear el usuario.');
      }
    );
  }

  // Actualiza un usuario
  updateUser(user: any) {
    this.userService.update(user.id, user).subscribe({
      next: (res) => {
        console.log('Usuario actualizado:', res);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      },
    });
  }

  // Elimina un usuario
  deleteUser(userId: number) {
    if (!userId) {
      console.error('No ID provided for user deletion');
      return;
    }
    this.userService.delete(userId).subscribe({
      next: (res) => {
        console.log('Usuario eliminado:', res);
        this.loadUsers(); 
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
      },
    });
  }

  async confirmDelete(id: number) {
    console.log('Confirmar eliminación del usuario con ID:', id);  // Verifica que el ID esté presente
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.deleteUser(id);  // Asegúrate de que el ID sea correcto aquí
          },
        },
      ],
    });
  
    await alert.present();
  }
}