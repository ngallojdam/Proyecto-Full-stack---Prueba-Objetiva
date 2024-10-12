import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyAnimalsPage } from './my-animals.page';

const routes: Routes = [
  {
    path: '',
    component: MyAnimalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyAnimalsPageRoutingModule {}
