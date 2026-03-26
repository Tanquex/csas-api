import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UtilService } from "src/common/services/util.service";
import { UserService } from "src/modules/user/interface/user.service";
import { PrismaService } from "src/common/services/prisma.service";
import { User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly utilService: UtilService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async login(username: string, password: string) {
    // 1. Verificar el usuario y contraseña
    const user = await this.userService.getUserByUsername(username);
    if (!user) throw new UnauthorizedException("Credenciales inválidas");
    if (!user.password) throw new UnauthorizedException("Credenciales inválidas");

    const passwordValid = await this.utilService.checkPassword(password, user.password);
    if (!passwordValid) throw new UnauthorizedException("Credenciales inválidas");

    // 2. Obtener información del usuario (payload)
    const payload = { sub: user.id, username: user.username };

    // 3. Generar el token JWT
    //    accessToken: expira en 60 segundos
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "60s",
    });

    //    refreshToken: expira en 7 días, se almacena en la base de datos
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: "7d",
    });

    // Guardar el refreshToken hasheado en la DB
    const refreshTokenHash = await this.utilService.hashPassword(refreshToken);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: refreshTokenHash },
    });

    // 4. Devolver el token encriptado
    return { accessToken, refreshToken };
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.userService.getUserById(userId);
    if (!user || !user.refreshToken) {
      throw new UnauthorizedException("Acceso denegado");
    }

    // Verificar que el refreshToken recibido coincide con el guardado en DB
    const tokenValido = await this.utilService.checkPassword(refreshToken, user.refreshToken);
    if (!tokenValido) throw new UnauthorizedException("Refresh token inválido");

    // Generar nuevo accessToken
    const payload = { sub: user.id, username: user.username };
    const nuevoAccessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: "60s",
    });

    return { accessToken: nuevoAccessToken };
  }

  async logout(userId: number) {
    // Borrar el refreshToken de la DB al cerrar sesión
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });
    return { message: "Sesión cerrada correctamente" };
  }

  public async getUserByName(username:string):Promise<User | null>{
    return await this.prisma.user.findFirst({
      where:{username}
    });
  }





  //version Profe
  public async getUserById(id:number):Promise<User | null>{
    return await this.prisma.user.findFirst({
      where:{id}
    });
  }

  public async updateHash(user_id:number, hash:string | null):Promise<User>{
    return await this.prisma.user.update({
      where:{id: user_id},
      data:{ hash }
    })

  }
  
}