import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-labels',
  templateUrl: 'labels.page.html',
  styleUrls: ['labels.page.scss'],
})
export class LabelsPage implements OnInit {
  animals: any[] = [];

  ngOnInit() {
    this.animals = [
      {
        title: 'Chihuahua',
        subtitle: 'Biblioteca de razas',
        description: 'Son los perros más pequeños que hay, su cráneo tiene forma de manzana y el pelo es suave, fino y corto. Los colores van desde el beis al negro. Un adulto compacto y delicado suele medir entre 15 y 23 cm y pesar de 1,8 a 2,7 kg.',
        image: 'frontend/src/assets/chihuahua.jpg',
        likes: this.getRandomNumber(1000, 10000),
        comments: this.getRandomNumber(10, 100),
        time: this.getRandomTime()
      },
      {
        title: 'Beagle',
        subtitle: 'Biblioteca de razas',
        description: 'Estos perros robustos y atrevidos son afables, además de compactos y atléticos. Tienen un pelaje corto, denso, resistente a las inclemencias del clima y se presenta en varios colores y patrones. (Para más información, consulta el estándar de la raza). Miden de 33 a 40 cm y pesan de 10 o 11 kg.',
        image: 'frontend/src/assets/beagle.jpg',
        likes: this.getRandomNumber(1000, 10000),
        comments: this.getRandomNumber(10, 100),
        time: this.getRandomTime()
      },
    ];
  }
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomTime(): string{
    const hours = this.getRandomNumber(1,24);
    return `Hace ${hours} horas`;
  }
}
