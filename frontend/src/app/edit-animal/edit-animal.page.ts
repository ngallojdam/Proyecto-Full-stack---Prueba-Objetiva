import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.page.html',
  styleUrls: ['./edit-animal.page.scss'],
})
export class EditAnimalPage implements OnInit {

  animal: any;

  constructor(
    private animalService: AnimalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const animalId = this.route.snapshot.paramMap.get('id');
    this.animalService.getAnimals().subscribe((data) => {
      this.animal = data;
    });
  }

  saveAnimal() {
    this.animalService.updateAnimal(this.animal.id, this.animal).subscribe(() => {
      this.router.navigate(['/animals']);
    });
  }
}
