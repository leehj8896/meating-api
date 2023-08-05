import { Body, Controller, FileTypeValidator, Get, HttpStatus, ParseFilePipe, ParseFilePipeBuilder, Post, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as dayjs from 'dayjs'
import { CreatePictureDto } from 'src/picture/dto/create-picture.dto';
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
    @Body() createPictureDto: CreatePictureDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({fileType: /[\/.](jpeg|png)$/i,})
      .addMaxSizeValidator({
        maxSize: 1024 * 1024
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),  
    ) file: Express.Multer.File): Picture {

    const current = dayjs().format('YYYYMMDDHHmmss')
    createPictureDto.filename = `${current}_${file.originalname}`
    createPictureDto.buffer = file.buffer
    createPictureDto.path = `upload/`
    console.log(`createPictureDto.filename: ${JSON.stringify(createPictureDto.filename)}`)
    return this.pictureService.createPicture(createPictureDto)
  }
}
