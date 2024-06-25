import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() name: string = '';
  @Input() isDisabled?: boolean = false;
  @Input() type?: string = 'text';
  @Input() placeholder?: string;

  @Input() label?: string = 'text';

  @Output() inputChange = new EventEmitter<string>();
}
