import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../services/animal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from '../services/photo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.page.html',
  styleUrls: ['./add-animal.page.scss'],
})
export class AddAnimalPage implements OnInit {
  animalForm!: FormGroup;
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
      race: ['', [Validators.required]],
    });
  }

  getFormControl(controlName: string) {
    return this.animalForm.get(controlName);
  }

  ionViewWillEnter() {
    this.animalForm.reset();
    this.isSubmitted = false;
    this.capturedPhoto = "";
  }

  // Toma una foto
  async takePhoto() {
    try {
      const data = await this.photoService.takePhoto();
      this.capturedPhoto = data.webPath || "";
    } catch (err) {
      console.error("Error taking photo: ", err);
    }
  }

  // Selecciona una imagen de la galería
  async pickImage() {
    try {
      const data = await this.photoService.pickImage();
      this.capturedPhoto = data.webPath || "";
    } catch (err) {
      console.error("Error picking image: ", err);
    }
  }

  // Descarta la foto tomada
  discardImage() {
    this.capturedPhoto = "";
  }

  // Convierte la foto capturada en un Blob
  private async convertPhotoToBlob(): Promise<Blob | null> {
    if (!this.capturedPhoto) return null;

    try {
      const response = await fetch(this.capturedPhoto);
      return await response.blob();
    } catch (error) {
      console.error("Error converting photo to blob:", error);
      return null;
    }
  }

  // Enviar formulario
  async submitForm() {
    this.isSubmitted = true;

    if (!this.animalForm.valid) {
      console.log("Please provide all the required values!");
      return;
    } else {
      let blob: Blob | null = await this.convertPhotoToBlob();

      // Crear FormData con los datos del formulario
      const formData = new FormData();
      formData.append("gender", this.animalForm.value.gender);
      formData.append("race", this.animalForm.value.race);

      // Si hay una foto capturada, se adjunta al FormData
      if (blob) {
        formData.append("file", blob, "animal-photo.jpg");
      }

      // Llamar al servicio para agregar el animal
      this.animalService.addAnimal(formData).subscribe(
        (response) => {
          console.log("Animal created successfully!", response);
          this.router.navigateByUrl("/my-animals"); // Redirige a la página de animales
        },
        (error) => {
          console.error("Error creating animal:", error);
        }
      );
    }
  }
}
