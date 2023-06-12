import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  // By default the string "jwt" is passed as second argument
  // that will be used in the controller like this:
  // UseGuards(AuthGuard('jwt'))
  'jwt',
) {
  constructor(configService: ConfigService) {
    super({
      // Set 'Bearer ' + <token> in Authorization header method
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // Auth effect (only runs if jwt validation passed)
  // Recieves the <payload> part of the validated/decoded jtwtoken
  validate(payload: any) {
    // Return value will be appended to request object as <user>
    return payload;
  }
}
