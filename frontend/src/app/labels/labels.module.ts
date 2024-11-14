import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LabelsPageRoutingModule } from './labels-routing.module';
import { LabelsPage } from './labels.page';
import { AnimalPopoverComponent } from './animal-popover/animal-popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabelsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LabelsPage, AnimalPopoverComponent ],
  exports: [LabelsPage],
})
export class LabelsPageModule {}