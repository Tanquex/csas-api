import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserService } from "src/modules/user/interface/user.service";
import { JwtModule } from "@nestjs/jwt";
import { UtilService } from "src/common/services/util.service";
import { PrismaService } from "src/common/services/prisma.service";

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, UtilService, PrismaService],
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '60s' },
      secret: process.env.JWT_ACCESS_SECRET || process.env.JWT_ACCESS_SECRET,

    }),
     // secrets se pasan por sign() usando process.env
  ],
})
export class AuthModule {}