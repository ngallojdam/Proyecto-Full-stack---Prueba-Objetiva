import { Component } from '@angular/core';
/*Creamos un enlace*/
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  gender: string = "perro";
  race: string = "pastor alemán";

  constructor(private router: Router) {}

  gotoMyAnimals() {
    this.router.navigateByUrl("/my-animals");
  }

}
