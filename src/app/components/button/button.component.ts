import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() color: string = 'primary';
  @Input() label: string = '';
  @Input() isDisabled: boolean = false;
  @Input() class?: string;
  @Input() icon?: string;

  @Output() onClick = new EventEmitter<Event>();

  handleClick(event: Event) {
    event.preventDefault();
    if (!this.isDisabled) {
      this.onClick.emit(event);
    }
  }
}
