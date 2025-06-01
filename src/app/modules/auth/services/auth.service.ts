import { Injectable } from '@angular/core';

import { environment } from '@/environments/environment';

const API_URL = `${environment.apiUrl}/auth`;

@Injectable()
export class AuthService {
  constructor() {
    console.log(API_URL);
  }
}
