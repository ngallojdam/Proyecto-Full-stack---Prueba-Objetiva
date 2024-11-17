import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app'; // Importar el plugin Capacitor para cerrar la app

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private alertController: AlertController) {}

  // Navegar a la página de animales
  gotoMyAnimals() {
    this.router.navigateByUrl("/my-animals");
  }

  // Navegar a la página de etiquetas
  gotoLabels() {
    this.router.navigateByUrl('/labels');
  }

  // Función para salir de la app con mensaje de despedida
  async exitApp() {
    const alert = await this.alertController.create({
      header: 'Goodbye!',
      message: 'Thank you for using the app! See you soon.',
      buttons: [
        {
          text: 'Close',
          handler: () => {
            // Cerrar la aplicación
            App.exitApp();
          }
        }
      ]
    });

    await alert.present();
  }
}
