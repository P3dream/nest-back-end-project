import { Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { JwtPayload, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { firstValueFrom } from 'rxjs';

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

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;
    const token = authorization?.split(' ')[1]; // Extrai apenas o token JWT
    if (!token) {
      console.log('Token ausente no cabeçalho Authorization');
      return false;
    }

    try {
      const secret = process.env.JWT_SECRET;
      const decodedToken = verify(token, secret) as JwtPayload;

      request.user = {
        id: decodedToken.sub,
        username: decodedToken.username,
        roles: decodedToken.roles,
      };

      console.log('Usuário autenticado:', request.user);
    } catch (err) {
      console.error('Falha ao decodificar o token:', err.message);
      return false;
    }

    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    const user = request.user;

    // Verifica se o usuário tem os papéis necessários
    if (requiredRoles && !requiredRoles.some((role) => user.roles?.includes(role))) {
      console.log('Você não tem permissão para acessar este recurso');
      return false;
    }

    const canActivate = super.canActivate(context);

    if (canActivate instanceof Observable) {
      return await firstValueFrom(canActivate);
    }
    return canActivate;
  }
}
