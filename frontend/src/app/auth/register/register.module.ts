import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule
    //RouterModule.forChild([{ path: '', component: RegisterPage }]),
  ],
  declarations: [RegisterPage],
})
export class RegisterModule {}
