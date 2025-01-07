import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const _authS = inject(AuthService);
  const router = inject(Router);
  if (_authS.isAuthorized())
    return true;
  else {
    router.navigate(["/login"]);
    return false;
  }

};
