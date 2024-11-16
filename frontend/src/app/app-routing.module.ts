import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { EditAnimalPage } from './edit-animal/edit-animal.page';

const routes: Routes = [
  {
    path: '', // Redirige al home por defecto
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home', // Ruta para el módulo HomePage
    loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'my-animals', // Ruta para el módulo MyAnimalsPage
    loadChildren: () =>
      import('./my-animals/my-animals.module').then((m) => m.MyAnimalsPageModule),
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
