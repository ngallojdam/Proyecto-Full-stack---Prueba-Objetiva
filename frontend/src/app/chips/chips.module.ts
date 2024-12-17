import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChipsPageRoutingModule } from './chips-routing.module';

import { ChipsPage } from './chips.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChipsPageRoutingModule
  ],
  declarations: [ChipsPage]
})
export class ChipsPageModule {}
