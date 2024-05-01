// jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '12817281621asooskdosjifujhop-sapsawoi012pewpkdcmnasjn1291',
    });
  }

  async validate(payload: any) {
    console.log('Payload received:', payload); // Adicionando log para depuração
    return { userId: payload.sub, username: payload.username };
  }
}
