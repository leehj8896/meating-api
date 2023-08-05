import { Body, Controller, FileTypeValidator, Get, HttpStatus, ParseFilePipe, ParseFilePipeBuilder, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Picture } from 'src/picture/picture.entity';
import { PictureService } from 'src/picture/picture.service';
import { GradeService } from './grade.service';

@Controller('grade')
export class GradeController {
  constructor(
    private configService: ConfigService, 
    private gradeService: GradeService,
    private pictureService: PictureService,
  ) {}

  @Get()
  findAll(@Req() request: Request): string {
    const dbUser = this.configService.get<string>('DATABASE_USER');
    console.log(`dbUser: ${dbUser}`)
    const pictures = this.pictureService.findAll()
    return JSON.stringify(pictures);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Body() body: object,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'jpeg',
      })
      .addMaxSizeValidator({
        maxSize: 1024 * 1024
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),  
    ) file: Express.Multer.File): string {

    console.log(`body: ${JSON.stringify(body)}`);
    console.log(`originalname: ${file.originalname}`);
    const filename = file.originalname
    return file.originalname
  }
}
