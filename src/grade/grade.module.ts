import { Module } from '@nestjs/common';
import { PictureModule } from 'src/picture/picture.module';
import { PictureService } from 'src/picture/picture.service';
import { GradeController } from './grade.controller';
import { GradeService } from './grade.service';

@Module({
  imports: [
    //ConfigModule.forRoot({isGlobal: true}),
    PictureModule,
  ],
  controllers: [GradeController],
  providers: [GradeService,],
})
export class GradeModule {}
