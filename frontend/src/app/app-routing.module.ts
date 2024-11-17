import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MyAnimalsPage } from './my-animals/my-animals.page';
import { HomePage } from './home/home.page';
import { EditAnimalPage } from './edit-animal/edit-animal.page';
import { LoginPage } from './auth/login/login.page';
import { RegisterPage} from './auth/register/register.page';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home', // Ruta para el módulo HomePage
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => 
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'my-animals',
    loadChildren: () =>
      import('./my-animals/my-animals.module').then((m) => m.MyAnimalsPageModule),
    canActivate: [AuthGuard], // Protección con guard
  },
  {
    path: 'add-animal', // Ruta para el módulo AddAnimalPage
    loadChildren: () =>
      import('./add-animal/add-animal.module').then((m) => m.AddAnimalPageModule),
  },
  {
    path: 'labels', // Ruta para el módulo LabelsPage
    loadChildren: () =>
      import('./labels/labels.module').then((m) => m.LabelsPageModule),
  },
  {
    path: 'edit-animal', // Ruta general para EditAnimalPage
    loadChildren: () =>
      import('./edit-animal/edit-animal.module').then((m) => m.EditAnimalPageModule),
  },
  {
    path: 'edit-animal/:id', // Ruta con parámetro para editar un animal
    component: EditAnimalPage, // Declaras aquí el componente
  },
  
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }), // Cambia a forRoot
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
