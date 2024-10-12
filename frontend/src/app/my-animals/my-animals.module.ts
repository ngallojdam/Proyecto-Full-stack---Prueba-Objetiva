import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MyAnimalsPageRoutingModule } from './my-animals-routing.module';
import { MyAnimalsPage } from './my-animals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MyAnimalsPageRoutingModule
  ],
  declarations: [MyAnimalsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyAnimalsPageModule {}
