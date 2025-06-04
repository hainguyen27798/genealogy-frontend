import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { TOKEN_KEYS } from '@app/common/constants';

export const withPermissionGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);

  const accessToken = sessionStorage.getItem(TOKEN_KEYS.ACCESS_TOKEN);
  if (!accessToken) {
    router.navigate(['/auth/login']).then();
    return false;
  }
  const permissions = route.data['permissions'];
  console.log(permissions);
  return true;
};
