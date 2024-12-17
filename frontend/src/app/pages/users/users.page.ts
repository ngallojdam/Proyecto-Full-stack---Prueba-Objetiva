import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router'; // Importar Router correctamente

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '', password: '' };  // Cambiar "name" a "username"


  constructor(
    private userService: UserService,
    private router: Router // Inyectar Router
    ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  // Obtener todos los usuarios
  fetchUsers() {
    this.userService.getAll().subscribe((data) => {
      this.users = data;
    });
  }

  // Crear un nuevo usuario
  createUser() {
    this.userService.create(this.newUser).subscribe(() => {
      // Llamar a fetchUsers para actualizar la lista de usuarios
      this.fetchUsers();

      // Limpiar el formulario
      this.newUser = { id: 0, name: '', email: '', password: '' };

      // Redirigir a la página de inicio después de crear el usuario
      this.router.navigate(['/home']);  // Redirigir a la página de inicio
    });
  }

  // Actualizar un usuario
  updateUser(user: User) {
    this.userService.update(user.id, user).subscribe(() => {
      this.fetchUsers();
    });
  }

  // Eliminar un usuario
  deleteUser(id: number) {
    this.userService.delete(id).subscribe(() => {
      this.fetchUsers();
    });
  }
}
