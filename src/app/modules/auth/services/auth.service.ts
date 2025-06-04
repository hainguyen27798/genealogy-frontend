import { inject, Injectable } from '@angular/core';
import { TOKEN_KEYS } from '@app/common/constants';
import { HttpServiceService } from '@app/common/services';
import type { TToken } from '@app/modules/auth/types';

import { environment } from '@/environments/environment';

const API_URL = `${environment.apiUrl}/auth`;

@Injectable()
export class AuthService {
  private readonly _HttpServiceService = inject(HttpServiceService);

  async login(email: string, password: string) {
    const res = await this._HttpServiceService.post<TToken>(`${API_URL}/login`, {
      email,
      password,
    });
    if (res.success) {
      sessionStorage.setItem(TOKEN_KEYS.ACCESS_TOKEN, res.data.accessToken);
      sessionStorage.setItem(TOKEN_KEYS.REFRESH_TOKEN, res.data.refreshToken);
    }
    return res.success;
  }
}
