import { Controller, Get, Req } from "@nestjs/common";

@Controller('picture')
export class PictureController {

    @Get()
    findAll(@Req() request: Request): string {
      //const dbUser = this.configService.get<string>('DATABASE_USER');
      return 'test';
    }  
}