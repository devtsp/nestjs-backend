import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  signup() {
    return { msg: 'Signin up' };
  }

  signin() {
    return { msg: 'Signin in' };
  }
}
