import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interface/auth.module';
import { TaskModule } from './modules/task/interface/task.module';
import { UtilService } from './common/services/util.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/user/interface/user.module';
import { LogsService } from './common/services/logs.service';
import { PrismaModule } from './common/services/primsa.module';

@Module({
  imports: [
    AuthModule,
    TaskModule,
    UserModule,
    JwtModule,
    PrismaModule
  ],
  providers: [ UtilService,LogsService],
  exports:[LogsService]
  
})
export class AppModule {}
