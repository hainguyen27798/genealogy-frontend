import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { InputFieldComponent } from '@app/common/component/input-field/input-field.component';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    NzButtonComponent,
    TranslatePipe,
    LucideAngularModule,
    InputFieldComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);

  showPassword = signal<boolean>(false);

  protected Eye = Eye;
  protected EyeOff = EyeOff;

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }
}
