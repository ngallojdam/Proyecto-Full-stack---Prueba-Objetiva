import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChipsPage } from './chips.page';

const routes: Routes = [
  {
    path: '',
    component: ChipsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChipsPageRoutingModule {}
