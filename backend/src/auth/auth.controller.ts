import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { GetEmployee } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  signIn(
    @Body()
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @UseGuards(AuthGuard())
  @Get()
  getLoggedUser(
    @GetEmployee('sucursal') sucursal: string,
    @GetEmployee('name') name: string,
    @GetEmployee('role') role: string,
  ) {
    const user = {
      name,
      role,
      sucursal,
    };

    return user;
  }
}
