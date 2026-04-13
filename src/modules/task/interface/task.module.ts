import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { mysqlProvider } from "src/common/providers/mysql.provider";
import { pgProvider } from "src/common/providers/pg.provider";
import { PrismaService } from "src/common/services/prisma.service";
import { JwtModule } from "@nestjs/jwt";
import { UtilService } from "src/common/services/util.service";


@Module({
    controllers: [TaskController],
    providers: [TaskService,
        mysqlProvider,
        PrismaService,
        UtilService
    ],
    imports: [
        JwtModule.register({
          secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET, 
          signOptions: { expiresIn: '60s' },
        }),
      ],
})
export class TaskModule {
    
}

