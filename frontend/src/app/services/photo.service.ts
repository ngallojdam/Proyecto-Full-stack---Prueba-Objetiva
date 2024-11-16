import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, GalleryPhoto, Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor() { }

  // Método para tomar una foto
  public async takePhoto(): Promise<Photo> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    return capturedPhoto;
  }

  // Método para seleccionar una imagen de la galería
  public async pickImage(): Promise<GalleryPhoto> {
    const capturedPhotos = await Camera.pickImages({
      limit: 1,
      quality: 100
    });

    return capturedPhotos.photos[0];
  }
}
