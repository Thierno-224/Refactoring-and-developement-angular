import {Component, input, InputSignal} from '@angular/core';
import {Stat} from "../../models/olympic-models";

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  titlePage: InputSignal<string> = input.required<string>();
  stats: InputSignal<Stat[]> = input.required<Stat[]>();

}
