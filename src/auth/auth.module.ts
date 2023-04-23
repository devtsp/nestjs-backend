import { Module } from '@nestjs/common';
import { AuthConstroller } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthConstroller],
  providers: [AuthService],
})
export class AuthModule {}
