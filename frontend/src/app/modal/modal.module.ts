import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemDetailModalComponent } from './item-detail-modal/item-detail-modal.component';

@NgModule({
  declarations: [ItemDetailModalComponent],  // Declara el componente aquí
  imports: [
    CommonModule,
    IonicModule  // Asegúrate de importar IonicModule
  ]
})
export class ModalModule {}
