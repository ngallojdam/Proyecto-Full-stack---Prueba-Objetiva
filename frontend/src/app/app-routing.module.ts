import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsersPage } from './pages/users/users.page';  // Asegúrate de que sea el componente correcto
import { HomePage } from './home/home.page';  // Este es tu componente de inicio
import { AuthGuard } from './guards/auth.guard';  // Crea un guard que proteja las rutas
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule) },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },  
  {
    path: 'my-animals',
    loadChildren: () => import('./my-animals/my-animals.module').then( m => m.MyAnimalsPageModule) },
  {
    path: 'chips',
    loadChildren: () => import('./chips/chips.module').then( m => m.ChipsPageModule)
  },
  // Ruta para 'modal', cargando ModalModule
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(m => m.ModalModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
