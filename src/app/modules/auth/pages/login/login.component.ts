import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationCheckerDirective } from '@app/common/directives';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';
import { Eye, EyeOff, LucideAngularModule } from 'lucide-angular';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-login',
  imports: [
    NgOptimizedImage,
    NzButtonComponent,
    TranslatePipe,
    LucideAngularModule,
    NzInputDirective,
    ReactiveFormsModule,
    ValidationCheckerDirective,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _AuthService = inject(AuthService);
  private readonly _Router = inject(Router);

  showPassword = signal<boolean>(false);
  isLoading = signal(false);

  protected Eye = Eye;
  protected EyeOff = EyeOff;

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }

  async submit() {
    this.formLogin.markAllAsTouched();

    if (this.formLogin.valid) {
      try {
        this.isLoading.set(true);
        const value = this.formLogin.value;
        const ok = await this._AuthService.login(value.email!, value.password!);
        if (ok) {
          await this._Router.navigate(['/']);
        }
      } finally {
        this.isLoading.set(false);
      }
    }
  }
}
