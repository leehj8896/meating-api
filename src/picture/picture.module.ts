import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from 'src/picture/picture.entity';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';

@Module({
  imports: [
    //ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forFeature([Picture]),
  ],
  controllers: [PictureController],
  providers: [PictureService,],
  exports: [PictureService],
})
export class PictureModule {}
