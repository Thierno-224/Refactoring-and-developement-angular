import {Component, input, InputSignal} from '@angular/core';
import {Stat} from "../../models/olympic-models";

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header-component.html',
  styleUrl: './header-component.scss'
})
export class HeaderComponent {
  titlePage: InputSignal<string> = input.required<string>();
  stats: InputSignal<Stat[]> = input.required<Stat[]>();

}
