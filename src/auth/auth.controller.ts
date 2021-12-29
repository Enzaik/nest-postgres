import { Body, Controller, Post } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  async signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return await this.authService.signup(authCredentialsDto);
  }

  @Post('/signin')
  async signin(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signin(authCredentialsDto);
  }
}
