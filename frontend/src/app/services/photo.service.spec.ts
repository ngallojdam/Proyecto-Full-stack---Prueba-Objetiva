import { TestBed } from '@angular/core/testing';
import { PhotoService } from './photo.service'; // Asegúrate de tener la ruta correcta
import { Camera } from '@capacitor/camera'; // Importamos solo lo que necesitamos de Camera

describe('PhotoService', () => {
  let service: PhotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should take a photo', async () => {
    const photo = await service.takePhoto();
    expect(photo).toBeDefined();
  });

  it('should pick an image', async () => {
    const image = await service.pickImage();
    expect(image).toBeDefined();
  });
});
