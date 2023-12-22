import {Injectable} from "@angular/core";
import {HttpInterceptor} from "@angular/common/http";
import {LocalStorageService} from "../services/Storage/local-storage.service";

@Injectable()
export class Interceptor  implements HttpInterceptor {
  constructor(
    private localStorage: LocalStorageService,
  ) {
  }

  intercept(req: any, next: any) {
    const token = this.localStorage.getToken();
     if (token) {
        const cloned = req.clone({
          headers: req.headers.set("Authorization",
            "Bearer " + token)
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }

  }
}
