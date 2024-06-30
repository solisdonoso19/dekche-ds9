import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() name: string = '';
  @Input() isDisabled: boolean = false;
  @Input() type?: string = 'text';
  @Input() placeholder?: string;
  @Input() form: FormGroup = new FormGroup({});

  @Input() label?: string;
  @Input() height?: string;

  @Output() inputChange = new EventEmitter<string>();

  handleKeyup(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log(`${this.name.toUpperCase()}:`, input.value);
    if (!this.isDisabled) {
      this.inputChange.emit(input.value);
    }
  }
}
