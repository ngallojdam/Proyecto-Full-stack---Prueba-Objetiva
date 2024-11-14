import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-animal-popover',
  templateUrl: './animal-popover.component.html',
  styleUrls: ['./animal-popover.component.scss'],
})
export class AnimalPopoverComponent {
  @Input() description!: string;

  constructor()  {}
}
