import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "../dto/login.dto";

@Controller("api/auth")
export class AuthController {
  constructor(private authSvc: AuthService) {}

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
    // Aquí después conectas el JwtAuthGuard para leer el usuario del token
    return { message: "endpoint /me pendiente de guard" };
  }
}