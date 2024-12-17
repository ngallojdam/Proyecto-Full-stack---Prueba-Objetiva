import { Component } from '@angular/core';
/*Creamos un enlace*/
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ItemDetailModalComponent } from '../modal/item-detail-modal/item-detail-modal.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  gender: string = "perro";
  race: string = "pastor alemán";

  constructor(private router: Router, private modalController: ModalController) {}

  gotoMyAnimals() {
    this.router.navigateByUrl("/my-animals");
  }
  gotoChips(){
    this.router.navigateByUrl("/chips");
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ItemDetailModalComponent, // Reemplaza con el componente modal correcto
    });
    await modal.present();
  }

  

}
