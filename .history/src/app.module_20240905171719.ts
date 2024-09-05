import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AppCont],
  providers: [AppService],
})
export class AppModule {}
