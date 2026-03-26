import { Body, Controller, ForbiddenException, Get, HttpCode, HttpStatus, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "../dto/login.dto";
import { UtilService } from "src/common/services/util.service";
import { AuthGuard } from "src/common/guards/auth.guard";
import { access } from "fs";

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
  
  //////////////////////////////////////////////////////////
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
      const access_token = await this.uitlService.generateJWT(payload, '1h');

      //generar refresh token
      const refresh_token = await this.uitlService.generateJWT(payload,'7d');
      const hashRT = await this.uitlService.hashPassword(refresh_token);

      //asignar hash al usuer
      await this.authSvc.updateHash(user.id,hashRT)
      payload.hash=hashRT

      //devolver jwt encriptado
      return{
        access_token,
        refresh_token: hashRT
      }

    }else{
      throw new UnauthorizedException('El usuario o contra es incorrecta ')
    }



    return this.authSvc.login(username, password);

  }

  @Get("/mee")
  @UseGuards(AuthGuard)
  public getProfilee(@Req() request: any){
    const user= request['user'];
    return user;
  }

  @Post("/refreshs")
    @UseGuards(AuthGuard)
  public async refreshTokenn(@Req() request: any){
    //obtener el user en sesion
    const sessionUser = request ['user'];
    const user= await this.authSvc.getUserById(sessionUser.id);
    if (!user || !user.hash) throw new ForbiddenException('Acceso Denegado')

    //combarar el token recibido con el token guardado
    if(sessionUser.hash != user.hash) throw new ForbiddenException('Token Invalido');


    //si el token es valido se generan nuevos tokens
    return{
      access_token:'',
      refresh_token:''
    }


  }

  @Post("/logout")
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  async logoutt(@Req() request:any) {
    const session=request['user'];
    const user = await this.authSvc.updateHash(session.id,null);
    return user;

  }
  
}

//git commit -a -m "bug: correcion de inisio de sesion y configuracion de rutas (me, logout, refresh)"