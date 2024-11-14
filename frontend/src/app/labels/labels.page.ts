import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, PopoverController } from '@ionic/angular';
import { AnimalPopoverComponent } from './animal-popover/animal-popover.component';

@Component({
  selector: 'app-labels',
  templateUrl: 'labels.page.html',
  styleUrls: ['labels.page.scss'],
})
export class LabelsPage implements OnInit {
  animals: any[] = [];

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private popoverController: PopoverController
  ){}

  ngOnInit() {
    this.presentLoading();
    setTimeout(() => {
    this.animals = [
      {
        title: 'Chihuahua',
        subtitle: 'Biblioteca de razas',
        description: 'Son los perros más pequeños que hay, su cráneo tiene forma de manzana y el pelo es suave, fino y corto. Los colores van desde el beis al negro. Un adulto compacto y delicado suele medir entre 15 y 23 cm y pesar de 1,8 a 2,7 kg.',
        image: 'assets/chihuahua.jpg',
        likes: this.getRandomNumber(1000, 10000),
        comments: this.getRandomNumber(10, 100),
        time: this.getRandomTime(),
        date: this.getRandomDate()
      },
      {
        title: 'Beagle',
        subtitle: 'Biblioteca de razas',
        description: 'Estos perros robustos y atrevidos son afables, además de compactos y atléticos. Tienen un pelaje corto, denso, resistente a las inclemencias del clima y se presenta en varios colores y patrones. (Para más información, consulta el estándar de la raza). Miden de 33 a 40 cm y pesan de 10 o 11 kg.',
        image: 'assets/beagle.jpg',
        likes: this.getRandomNumber(1000, 10000),
        comments: this.getRandomNumber(10, 100),
        time: this.getRandomTime(),
        date: this.getRandomDate()
      },
    ];
    this.presentToast();
  }, 2000);
}

async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Cargando animales...',
    duration: 2000
  });
  await loading.present();
}

  async presentToast() {
    const toast = await this.toastController.create({
      message: "Animales cargados exitosamente!",
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentPopover(ev: any, animal: any) {
    const popover = await this.popoverController.create({
      component: AnimalPopoverComponent,
      componentProps: { description: animal.description },
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomTime(): string{
    const hours = this.getRandomNumber(1,24);
    return `Hace ${hours} horas`;
  }

  getRandomDate(): string {
    const today = new Date();
    const daysAgo = this.getRandomNumber(1, 30); // Rango de hasta 30 días atrás
    const randomDate = new Date(today.setDate(today.getDate() - daysAgo));
    return randomDate.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
