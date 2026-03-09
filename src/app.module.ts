import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/interface/auth.module';
import { TaskModule } from './modules/task/interface/task.module';
import { ServicesService } from './util/common/services/services.service';
import { UtilService } from './common/services/util.service';

@Module({
  imports: [
    AuthModule,
    TaskModule
  ],
  providers: [ServicesService, UtilService],
  
})
export class AppModule {}
