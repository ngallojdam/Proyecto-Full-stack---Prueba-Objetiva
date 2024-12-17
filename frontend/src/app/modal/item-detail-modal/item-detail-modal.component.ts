import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-item-detail-modal',
  templateUrl: './item-detail-modal.component.html',
  styleUrls: ['./item-detail-modal.component.scss'],
})
export class ItemDetailModalComponent {
  @Input() selectedItem: any; // Define el tipo de `selectedItem` (por ejemplo, string, objeto, etc.)
  items: string[] = []; // Arreglo para almacenar los ítems
  isInfiniteDisabled: boolean = false; // Para controlar el infinite scroll

  // Aquí el nombre correcto es modalController
  constructor(private modalController: ModalController) {}

  private generateItems(count: number) {
    const start = this.items.length + 1;
    for (let i = 0; i < count; i++) {
      this.items.push(`Item ${start + i}`);
    }
  }

  // Método para manejar la carga de más ítems en el scroll infinito
  onIonInfinite(event: any) {
    setTimeout(() => {
      const start = this.items.length + 1; // Obtener el índice inicial
      for (let i = 0; i < 3; i++) {
        this.items.push(`Item ${start + i}`); // Añadir nuevos ítems
      }

      // Desactivar el infinite scroll si se alcanza el límite
      if (this.items.length >= 50) {
        this.isInfiniteDisabled = true;
      }

      // Finalizar el evento de scroll infinito
      event.target.complete();
    }, 1000);
  }

  // Método para cerrar el modal
  async closeModal() {
    await this.modalController.dismiss();
  }

  // Función para abrir el modal con los detalles del ítem
  async openItemModal(item: string) {
    const modal = await this.modalController.create({
      component: ItemDetailModalComponent,
      componentProps: { item: item }, // Pasamos el ítem al modal
    });
    return await modal.present();
  }
}
