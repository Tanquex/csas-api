import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { mysqlProvider } from "src/common/providers/mysql.provider";
import { pgProvider } from "src/common/providers/pg.provider";
import { PrismaService } from "src/common/services/prisma.service";
import { UtilService } from "src/common/services/util.service";


@Module({
    controllers: [UserController],
    providers: [UserService,
        mysqlProvider,
        pgProvider,
        PrismaService,
        UtilService
    ]
})
export class UserModule {
    
}

