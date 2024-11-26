import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const canActivate = super.canActivate(context);
    if (canActivate instanceof Observable) {
      return await firstValueFrom(canActivate);
    }
    return canActivate;
  }
}
