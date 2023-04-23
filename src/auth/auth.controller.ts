import { Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthConstroller {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup() {
    return 'Signin up';
  }

  @Post('signin')
  signin() {
    return 'Signin in';
  }
}
