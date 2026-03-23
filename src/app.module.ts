import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interface/auth.module';
import { TaskModule } from './modules/task/interface/task.module';
import { UtilService } from './common/services/util.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/interface/user.module';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule,
    JwtModule
  ],
  providers: [ UtilService],
  
})
export class AppModule {}
