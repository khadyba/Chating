import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';

// console.log({ secret: process.env.JWT_SECRET });
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret:"170eb79fed7f4a2ec11d5f7ae13e0b707a28b3bc4988e67adbf4b9fa495a4e74",
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
