import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddAnimalPageRoutingModule } from './add-animal-routing.module';
import { AddAnimalPage } from './add-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddAnimalPageRoutingModule, 
    ReactiveFormsModule
  ],
  declarations: [AddAnimalPage],
  exports: [AddAnimalPage]
})
export class AddAnimalPageModule {}
