import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginModule } from './auth/login/login.module';
import { RegisterModule } from './auth/register/register.module';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AddAnimalPageModule } from './add-animal/add-animal.module';
import { RouteReuseStrategy } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; /* importamos este módulo */
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [AppComponent],
  imports: [FormsModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, CommonModule, AddAnimalPageModule, LoginModule, RegisterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
