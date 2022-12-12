// import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
// import { Observable } from "rxjs";
// import { UserService } from "src/module/user/user.service";

// @Injectable()
// export class AuthGuard implements CanActivate {
//   private readonly logger = new Logger(AuthGuard.name);
//   constructor(private readonly userService: UserService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     if (this.userService.getId() === 1) {
//       this.logger.log('ok');
//       return true;
//     } else {
//       this.logger.log('ko có quyền truy cập');
//       return false;
//     }
//   }
// }