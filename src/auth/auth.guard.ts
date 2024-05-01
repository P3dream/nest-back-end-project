// auth.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Se a rota for pública, permite o acesso sem autenticação
    }

    const request = context.switchToHttp().getRequest();
    console.log('User:', request.user); // Adicionando log para depuração
    return request.user; // Retorna true se o usuário estiver autenticado, caso contrário, retorna false
  }
}
