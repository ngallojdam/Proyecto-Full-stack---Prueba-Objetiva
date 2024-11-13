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
  @ViewChild('genderInput', { static: false }) genderInput!: IonInput;
  animalForm: FormGroup;
  animals: any[] = [];
  isEditMode: boolean = false;
  currentAnimalId: number | null = null;
    
  constructor(private animalService : AnimalService, private fb: FormBuilder, private router:Router) { 

  this.animalForm = this.fb.group({
    gender: ['', Validators.required], 
    race: ['', Validators.required], 
  });
}

  ngOnInit() {
   // this.loadAnimals();
  }

  ionViewDidEnter(){
    this.getAllAnimals();
  }

  getAllAnimals() {
    this.animalService.getAnimals().subscribe(animals=> {
      console.log(animals);
      this.animals = animals;
    })
  }

  addAnimal(){
    //if (this.animalForm.valid) {
    //  this.animalService.addAnimal(this.animalForm.value).subscribe(() => {
     //   this.loadAnimals(); 
     //   this.animalForm.reset(); 
      //});
      this.router.navigateByUrl("/add-animal"); // ya podemos acceder a la página de add-animal
    }

   

  ngAfterViewInit() {
    setTimeout(() => {
      this.genderInput.setFocus();
    }, 500);
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

  
//}

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
        id: this.currentAnimalId // Asegúrate de incluir el ID
      };
  
      this.animalService.updateAnimal(this.currentAnimalId, updatedAnimal).subscribe(response => {
        console.log('Animal updated successfully:', response);
        this.loadAnimals(); 
        this.animalForm.reset(); 
        this.isEditMode = false; 
        this.currentAnimalId = null; 
      }, error => {
        console.error('Error updating animal:', error);
      });
    } else {
      console.error('Cannot update animal: currentAnimalId is null');
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