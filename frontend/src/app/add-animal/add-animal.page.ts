import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../services/animal.service';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.page.html',
  styleUrls: ['./add-animal.page.scss'],
})
export class AddAnimalPage implements OnInit {

  animalForm!: FormGroup;  // Propiedad marcada como "definitivamente asignada"
  isSubmitted: boolean = false;
  capturedPhoto: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit() { 
    this.animalForm = this.formBuilder.group({
      gender: ['', [Validators.required]],
      race: ['', [Validators.required]]
    });
  }

  getFormControl(field: string) {
    return this.animalForm.get(field);
  }

  ionViewWillEnter() {
    this.animalForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  // Toma una foto
  takePhoto() {
    this.photoService.takePhoto().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    }).catch(err => {
      console.error("Error taking photo: ", err);
    });
  }

  // Selecciona una imagen de la galería
  pickImage() {
    this.photoService.pickImage().then(data => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    }).catch(err => {
      console.error("Error picking image: ", err);
    });
  }

  // Descarta la foto tomada
  discardImage() {
    this.capturedPhoto = "";
  }

  // Enviar formulario
  async submitForm() {
    this.isSubmitted = true;
    
    if (!this.animalForm.valid) {
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob: Blob | null = null;
      
      // Si la foto está capturada, conviértela a un Blob
      if (this.capturedPhoto) {
        try {
          const response = await fetch(this.capturedPhoto);
          blob = await response.blob();
        } catch (error) {
          console.error('Error converting photo to blob:', error);
        }
      }

      // Aseguramos que la variable blob no esté nula
      const safeBlob = blob || new Blob();

      // Llamar al servicio para crear el animal
      this.animalService.createAnimal(this.animalForm.value, safeBlob).subscribe(
        (data) => {
          console.log("Animal created successfully!", data);
          this.router.navigateByUrl("/my-animals"); // Redirige a la página de animales
        },
        (error) => {
          console.error("Error creating animal:", error);
        }
      );
    }
  }
}