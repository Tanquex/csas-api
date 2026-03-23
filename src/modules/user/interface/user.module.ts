import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { mysqlProvider } from "src/common/providers/mysql.provider";
import { PrismaService } from "src/common/services/prisma.service";
import { UtilService } from "src/common/services/util.service";
import { JwtModule } from "@nestjs/jwt";


@Module({
    controllers: [UserController],
    providers: [UserService,
        mysqlProvider,
        PrismaService,
        UtilService,
        
    ],
    exports: [UserService],
    imports: [
    JwtModule.register({
      secret: 'miSuperSecreto', 
      signOptions: { expiresIn: '60s' },
    }),
  ],

})
export class UserModule {
    
}

