import { inject } from '@angular/core';
import type { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const withPermissionGuard: CanActivateFn = (route, _state) => {
  const router = inject(Router);

  const userPermissions = sessionStorage.getItem('permissions');
  if (!userPermissions) {
    router.navigate(['/auth/login']).then();
    return false;
  }
  const permissions = route.data['permissions'];
  console.log(permissions);
  return true;
};
