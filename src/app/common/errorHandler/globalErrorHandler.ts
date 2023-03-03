import {ErrorHandler, Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(
    private router: Router
  ) {}

  handleError(error: Error) {
    if(error.message === 'Token has expired') {
      this.router.navigate(['login'])
    }
  }
}
