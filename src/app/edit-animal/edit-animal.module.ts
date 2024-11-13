import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAnimalPageRoutingModule } from './edit-animal-routing.module';

import { EditAnimalPage } from './edit-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAnimalPageRoutingModule
  ],
  declarations: [EditAnimalPage]
})
export class EditAnimalPageModule {}
