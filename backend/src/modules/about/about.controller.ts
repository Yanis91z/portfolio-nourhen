import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AboutService } from './about.service';
import { UpdateAboutDto } from '../../dto/update-about.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('about')
export class AboutController {
  constructor(private readonly service: AboutService) {}

  @Get()
  get() {
    return this.service.get();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() dto: UpdateAboutDto) {
    return this.service.update(dto);
  }
}
