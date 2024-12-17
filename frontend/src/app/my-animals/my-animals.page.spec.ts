import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAnimalsPage } from './my-animals.page';

describe('MyAnimalsPage', () => {
  let component: MyAnimalsPage;
  let fixture: ComponentFixture<MyAnimalsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAnimalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
