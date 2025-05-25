import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  private readonly _TranslateService = inject(TranslateService);

  constructor() {
    this._TranslateService.addLangs(['en', 'vi']);
    this._TranslateService.setDefaultLang('vi');
    this._TranslateService.use('vi');
  }
}
