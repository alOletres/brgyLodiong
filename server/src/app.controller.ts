import {
  Controller,
  Post,
  Res,
  UseGuards,
  Request,
  Put,
  Body,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Response } from 'express';
import { ChangePasswordDto } from './auth/dto/change-password.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const { access_token } = await this.authService.login(req.user);

    res.json({ access_token });
  }

  @Put('/:email')
  async changePassword(
    @Param('email') email: string,
    @Body() payload: ChangePasswordDto,
  ) {
    try {
      return await this.authService.changePassword(email, payload);
    } catch (err) {
      throw err;
    }
  }

}
