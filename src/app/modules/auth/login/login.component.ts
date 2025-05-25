import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    NzInputDirective,
    NzButtonComponent,
    TranslatePipe,
    LucideAngularModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = signal<boolean>(false);

  protected Eye = Eye;
  protected EyeOff = EyeOff;

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }
}
