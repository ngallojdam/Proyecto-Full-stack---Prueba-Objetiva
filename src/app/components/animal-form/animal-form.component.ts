import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from 'src/app/services/animal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./animal-form.component.scss'],
})
export class AddAnimalComponent implements OnInit {
  animalForm: FormGroup;

  constructor(private fb: FormBuilder, private animalService: AnimalService, private router: Router) { 

    this.animalForm = this.fb.group({
      race: ['', Validators.required],
      gender: ['', Validators.required],

    });
  }

  ngOnInit() {

    this.animalForm = this.fb.group({
      race: ['', Validators.required],
      gender: ['', Validators.required],
    });


  } 
  

  onSubmit() {
    if (this.animalForm.valid) {
      this.animalService.createAnimal(this.animalForm.value).subscribe((response: any) => {
        console.log('Animal created', response);
        this.router.navigate(['/animals']);
      });
    }
  }
}