import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { TError, TResponse } from '@app/common/types';
import { TranslateService } from '@ngx-translate/core';
import { get } from 'lodash-es';
import { NzMessageService } from 'ng-zorro-antd/message';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _TranslateService = inject(TranslateService);
  private readonly _NzMessageService = inject(NzMessageService);

  async post<T = unknown>(
    url: string,
    body: Record<string, unknown>,
  ): Promise<TResponse<T> | TError> {
    try {
      const res = await firstValueFrom(this._HttpClient.post(url, body));
      return {
        success: true,
        message: get(res, 'message') || '',
        data: get(res, 'data') as unknown as T,
      };
    } catch (e) {
      this._NzMessageService.error(
        this._TranslateService.instant(`error_msg.${get(e, 'error.message')}`),
      );
      return {
        success: false,
        ...(get(e, 'error') || {}),
      } as unknown as TError;
    }
  }
}
