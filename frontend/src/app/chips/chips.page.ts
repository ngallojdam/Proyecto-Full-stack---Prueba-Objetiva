import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular'; // Importa ModalController
import { Router } from '@angular/router'; // Importa Router
import { ItemDetailModalComponent } from '../modal/item-detail-modal/item-detail-modal.component';

@Component({
  selector: 'app-chips',
  templateUrl: './chips.page.html',
  styleUrls: ['./chips.page.scss'],
})
export class ChipsPage {
  constructor(
    private modalController: ModalController,
    private router: Router // Inyecta Router
  ) {} // Inyecta ModalController

  // Método para abrir el modal
  async openItemModal() {
    const modal = await this.modalController.create({
      component: ItemDetailModalComponent, // El componente que se mostrará en el modal
    });
    return await modal.present();
  }

  goToHome() {
    this.router.navigate(['/home']); // Navega a la página principal
    console.log('Volver a home');
  }
}
