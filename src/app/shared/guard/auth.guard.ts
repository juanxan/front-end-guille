import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router= inject(Router); 
  const authService= inject(AuthService); 
  if (!authService.isLogged()) {
    router.navigate(['/auth'])
    .then(()=>{
      window.location.reload();
   });
    return false;
  } else {
    return true;
  }
};
