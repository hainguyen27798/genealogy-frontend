import { NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-login',
  imports: [NgOptimizedImage, NzInputDirective, NzInputGroupComponent, NzButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = signal<boolean>(false);

  toggleShowPassword() {
    this.showPassword.set(!this.showPassword());
  }
}
