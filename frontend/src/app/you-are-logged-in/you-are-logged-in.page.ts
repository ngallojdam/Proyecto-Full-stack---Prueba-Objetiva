import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AnimalService } from '../services/animal.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-you-are-logged-in',
  templateUrl: './you-are-logged-in.page.html',
  styleUrls: ['./you-are-logged-in.page.scss'],
})
export class YouAreLoggedInPage implements OnInit {

  constructor(
    private authService: AuthService,
    private animalService: AnimalService,
    private router: Router,
    private storage: Storage) { }

  async ngOnInit() {
    this.getAnimals();
  }

  ionViewDidEnter() {
    this.getAnimals();
  }

  async getAnimals() {
    let token = await this.storage.get("token");
    this.animalService.getAnimals(token).subscribe({
      next: res => {
        console.log("User Logged in. This is the motorbike list:");
        console.log(res);
      }, error: error => {
        console.log(error);
        console.log("User not authenticated. Please log in");
        this.router.navigateByUrl("/home");
      }
    });
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl("/home");
    });
  }

}
