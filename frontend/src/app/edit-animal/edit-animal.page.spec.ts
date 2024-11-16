import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAnimalPage } from './edit-animal.page';

describe('EditAnimalPage', () => {
  let component: EditAnimalPage;
  let fixture: ComponentFixture<EditAnimalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAnimalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
