import {Component, input, InputSignal} from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  title : InputSignal<string> = input.required<string>();
  value: InputSignal<number> = input.required<number>();

}
