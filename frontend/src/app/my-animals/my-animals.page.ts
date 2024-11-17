import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, ActionSheetController, AlertController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.page.html',
  styleUrls: ['./my-animals.page.scss'],
})
export class MyAnimalsPage implements OnInit, AfterViewInit {
  @ViewChild('genderInput', { static: false }) genderInput!: IonInput;
  animalForm: FormGroup;
  animals: any[] = [];
  isEditMode: boolean = false;
  currentAnimalId: number | null = null;

  constructor(
    private authService: AuthService,
    private animalService: AnimalService,
    private fb: FormBuilder,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController
    
  ) {
    this.animalForm = this.fb.group({
      gender: ['', Validators.required],
      race: ['', Validators.required],
    });
  }

  ngOnInit() {
  if (!this.authService.isAuthenticated()) {
    this.router.navigate(['/login']); // Redirigir a login si no está autenticado
  } else {
    this.getAllAnimals();
  }
}

  ionViewDidEnter() {
    this.getAllAnimals();
  }

  getAllAnimals() {
    this.animalService.getAnimals().subscribe(animals => {
      this.animals = animals;
    });
  }

  async addAnimal() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Choose Action',
      buttons: [
        {
          text: 'Add New Animal',
          icon: 'add-circle-outline',
          handler: () => {
            this.router.navigateByUrl('/add-animal');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  editAnimal(animal: any) {
    this.isEditMode = true;
    this.currentAnimalId = animal.id;
    this.animalForm.patchValue({
      gender: animal.gender,
      race: animal.race,
    });
    this.genderInput.setFocus();
  }

  updateAnimal() {
    if (this.currentAnimalId !== null) {
      const updatedAnimal = {
        ...this.animalForm.value,
        id: this.currentAnimalId,
      };

      this.animalService.updateAnimal(this.currentAnimalId, updatedAnimal).subscribe(
        response => {
          this.loadAnimals();
          this.animalForm.reset();
          this.isEditMode = false;
          this.currentAnimalId = null;
        },
        error => {
          console.error('Error updating animal:', error);
        }
      );
    }
  }

  async deleteAnimal(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this animal?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Delete',
          handler: () => {
            this.animalService.deleteAnimal(id).subscribe(() => {
              this.loadAnimals();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe(
      (data: any[]) => {
        this.animals = data;
      },
      error => {
        console.error('Error loading animals:', error);
      }
    );
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.genderInput.setFocus();
    }, 500);
  }
}
