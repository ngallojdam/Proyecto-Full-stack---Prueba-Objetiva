import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'my-animals',
    loadChildren: () => import('./my-animals/my-animals.module').then( m => m.MyAnimalsPageModule)
  },
  {
    path: 'chips',
    loadChildren: () => import('./chips/chips.module').then( m => m.ChipsPageModule)
  },
  // Ruta para 'modal', cargando ModalModule
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then(m => m.ModalModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/users/users.module').then( m => m.UsersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
