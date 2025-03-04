import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body('email') email: string,@Body('firstName') firstName: string, @Body('lastName') lastName: string, @Body('password') password: string) {
    return this.authService.register(email, firstName,lastName,password);
  }

  @Post('login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    return this.authService.validateUser(email, password).then(user => {
      return this.authService.login(user);
    });
  }
}

