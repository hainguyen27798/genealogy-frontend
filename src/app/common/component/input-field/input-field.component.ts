import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'input-field',
  imports: [NzInputDirective],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputFieldComponent {
  placeholder = input('');
  type = input<'text' | 'password'>('text');
  className = input<string>('');
}
