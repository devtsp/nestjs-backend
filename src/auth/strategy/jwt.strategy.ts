import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
// String "jwt" is passed as second argument:
// that can later be referenced directly in calls
// to AuthGuard from @nestjs/passport. That created config
// needs to be passed to @UseGuards from @nestjs/common
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private prismaService: PrismaService,
  ) {
    super({
      // Use the Bearer + token auth header strategy
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // Auth effect (only runs if jwt validation passed)
  // Recieves the <payload> part of the validated/decoded jtwtoken
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;

    // Return value will be appended to request object as <user>
    // If we return null, 401 response will be returned
    return user;
  }
}
