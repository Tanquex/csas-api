import { Body, Controller, Get, HttpCode, HttpStatus, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "../dto/login.dto";
import { UtilService } from "src/common/services/util.service";

@Controller("api/auth")
export class AuthController {
  constructor(private authSvc: AuthService,private readonly uitlService:UtilService) {}

  @Post("/login")
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    return this.authSvc.login(username, password);
  }

  @Post("/refresh")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() body: { userId: number; refreshToken: string }) {
    return this.authSvc.refreshTokens(body.userId, body.refreshToken);
  }

  @Post("/logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Body() body: { userId: number }) {
    return this.authSvc.logout(body.userId);
  }

  @Get("/me")
  getProfile() {
    
    return { message: "endpoint /me pendiente de guard" };
  }
  
  // Version Profe
  
   @Post("/loginn")
  @HttpCode(HttpStatus.OK)
  async loginn(@Body() loginDto: LoginDto):Promise<any> {
    const { username, password } = loginDto;
//verificar usuario y contra
    const user =await this.authSvc.getUserByName(username);
    if(!user)
      throw new UnauthorizedException('El usuario o contra es incorrecta ')

    if(await this.uitlService.checkPassword(password,user.password)){
      //obtener payload
      const{password,username,...payload}=user

      //Generar jwt
      const access_token = await this.uitlService.generateJWT(payload);

      //generar refresh token
      const refresh_token = await this.uitlService.generateJWT(payload,'7d');

      //devolver jwt encriptado
      return{
        access_token,
        refresh_token
      }

    }else{
      throw new UnauthorizedException('El usuario o contra es incorrecta ')
    }



    return this.authSvc.login(username, password);

  }
  
}