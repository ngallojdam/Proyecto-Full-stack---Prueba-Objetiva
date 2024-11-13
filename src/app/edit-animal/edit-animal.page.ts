import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../services/animal.service';
import { PhotoService } from '../services/photo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.page.html',
  styleUrls: ['./edit-animal.page.scss'],
})
export class EditAnimalPage implements OnInit {
  animalForm!: FormGroup;
  capturedPhoto: string = "";
  isSubmitted: boolean = false;
  animalId: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private animalService: AnimalService,
    private photoService: PhotoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.animalForm = this.formBuilder.group({
      gender: ['', [Validators.required]],
      race: ['', [Validators.required]]
    });

    // Obtener el ID del animal desde los parámetros de la URL
    this.animalId = this.route.snapshot.paramMap.get('id') || '';
    
    // Cargar datos del animal en el formulario
    this.loadAnimal();
  }

  loadAnimal() {
    this.animalService.getAnimal(this.animalId).subscribe((animal) => {
      this.animalForm.patchValue({
        gender: animal.gender,
        race: animal.race
      });
      // Si el animal tiene una foto, mostrarla
      this.capturedPhoto = animal.photoUrl || "";
    });
  }

  takePhoto() {
    this.photoService.takePhoto().then((data) => {
      this.capturedPhoto = data.webPath ? data.webPath : "";
    });
  }

  pickImage() {
    this.photoService.pickImage().then((data) => {
      this.capturedPhoto = data.webPath;
    });
  }

  discardImage() {
    this.capturedPhoto = "";
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.animalForm.valid) {
      console.log('Please provide all the required values!');
      return;
    } else {
      let blob: Blob | null = null;
      if (this.capturedPhoto) {
        const response = await fetch(this.capturedPhoto);
        blob = await response.blob();
      }

      // Enviar los datos actualizados del animal
      this.animalService.updateAnimal(this.animalId, this.animalForm.value, blob || new Blob()).subscribe(() => {
        console.log("Animal updated successfully!");
        this.router.navigateByUrl("/my-animals"); // Redirige a la lista de animales
      }, (error) => {
        console.error("Error updating animal:", error);
      });
    }
  }
}
