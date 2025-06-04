import type { OnInit } from '@angular/core';
import { input } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { DestroyRef } from '@angular/core';
import { Directive, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import type { AbstractControl, ControlEvent } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, firstValueFrom } from 'rxjs';

@Directive({
  selector: '[validation-checker]',
})
export class ValidationCheckerDirective implements OnInit {
  private readonly _NgControl = inject(NgControl);
  private readonly _DestroyRef = inject(DestroyRef);
  private readonly _Renderer = inject(Renderer2);
  private readonly _ElementRef = inject(ElementRef);
  private readonly _TranslateService = inject(TranslateService);

  private control: AbstractControl | null = null;
  private errorElement: HTMLElement | null = null;

  anchor = input<HTMLElement>();

  ngOnInit() {
    this.control = this._NgControl?.control;
    if (!this.control) return;

    this.control?.events
      ?.pipe(takeUntilDestroyed(this._DestroyRef), debounceTime(100))
      .subscribe((_event: ControlEvent) => {
        this.updateErrorMessage().then();
      });
  }

  private async updateErrorMessage() {
    if (!this.control || !this.control.errors || !this.control.touched) {
      this.removeError();
      return;
    }

    const firstErrorKey = Object.keys(this.control.errors)[0];

    if (firstErrorKey) {
      const msg = await firstValueFrom(
        this._TranslateService.get(
          `input_error.${firstErrorKey}`,
          this.control?.errors[firstErrorKey] || {},
        ),
      );
      this.renderError(msg);
    }
  }

  private renderError(message: string): void {
    this.removeError();

    this._Renderer.addClass(this._ElementRef.nativeElement, '!border-red-600');
    this.errorElement = this._Renderer.createElement('div');
    this._Renderer.addClass(this.errorElement, 'text-sm');
    this._Renderer.addClass(this.errorElement, 'text-red-600');
    this._Renderer.addClass(this.errorElement, 'mt-[6px]');
    const text = this._Renderer.createText(message);
    this._Renderer.appendChild(this.errorElement, text);
    this._Renderer.appendChild(
      this.anchor()?.parentElement || this._ElementRef.nativeElement.parentElement,
      this.errorElement,
    );
  }

  private removeError(): void {
    this._Renderer.removeClass(this._ElementRef.nativeElement, '!border-red-600');
    if (this.errorElement) {
      this._Renderer.removeChild(this._ElementRef.nativeElement.parentElement, this.errorElement);
      this.errorElement = null;
    }
  }
}
