import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interface/auth.module';
import { TaskModule } from './modules/task/interface/task.module';
import { UtilService } from './common/services/util.service';

@Module({
  imports: [
    AuthModule,
    TaskModule
  ],
  providers: [ UtilService],
  
})
export class AppModule {}
