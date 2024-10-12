import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-my-animals',
  templateUrl: './my-animals.page.html',
  styleUrls: ['./my-animals.page.scss'],
})


export class MyAnimalsPage implements OnInit, AfterViewInit {
  animals: any[] = [];
  isEditMode: boolean = false;
  currentAnimalId: number | null = null;

  @ViewChild('genderInput', { static: false}) genderInput!: IonInput;
  animalForm: FormGroup;
    
  constructor(private animalService : AnimalService, private fb: FormBuilder, private router:Router) { 

  this.animalForm = this.fb.group({
    gender: ['', Validators.required], 
    race: ['', Validators.required], 
  });
}

  ngOnInit() {
    this.loadAnimals();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.genderInput.setFocus();
    }, 500);
  }

  loadAnimals() {
    this.animalService.getAnimals().subscribe((data: any) => {
      this.animals = data
    });
  }

  addAnimal() {
    if (this.animalForm.valid) {
      this.animalService.addAnimal(this.animalForm.value).subscribe(() => {
        this.loadAnimals(); 
        this.animalForm.reset(); 
      });
    }
  }

  editAnimal(animal: any) {
    this.isEditMode = true;
    this.currentAnimalId = animal.id;
    this.animalForm.patchValue({
      gender: animal.gender,
      race: animal.race,
    });
  }

  updateAnimal() {
    if (this.animalForm.valid && this.currentAnimalId) {
      this.animalService.updateAnimal(this.currentAnimalId, this.animalForm.value).subscribe(() => {
        this.loadAnimals(); 
        this.animalForm.reset(); 
        this.isEditMode = false; 
        this.currentAnimalId = null; 
      });
    }
  }

  deleteAnimal(id: number) {
    this.animalService.deleteAnimal(id).subscribe(() => {
      this.loadAnimals();
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}