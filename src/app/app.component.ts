import { Component, effect, HostBinding, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: `
    :host {
      transition: 0.3s opacity;
    }
  `,
})
export class AppComponent {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _Router = inject(Router);

  routeEvent = toSignal(this._Router.events);
  isLoading = signal(false);

  @HostBinding('class.opacity-0')
  get isLoadingClass() {
    return this.isLoading();
  }

  constructor() {
    this._TranslateService.addLangs(['en', 'vi']);
    this._TranslateService.setDefaultLang('vi');
    this._TranslateService.use('vi');

    effect(() => {
      this.isLoading.update(
        () =>
          !this.routeEvent()?.type ||
          ![
            EventType.NavigationEnd,
            EventType.NavigationCancel,
            EventType.NavigationError,
          ].includes(this.routeEvent()!.type),
      );
    });
  }
}
