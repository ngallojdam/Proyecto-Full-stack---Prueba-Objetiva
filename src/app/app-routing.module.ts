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
    path: 'edit-animal',
    loadChildren: () => import('./edit-animal/edit-animal.module').then( m => m.EditAnimalPageModule)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  
  { path: 'edit-animal/:id', loadChildren: () => import('./edit-animal/edit-animal.module').then(m => m.EditAnimalPageModule) },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


  