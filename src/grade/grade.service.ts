import { Inject, Injectable } from '@nestjs/common';
import { Picture } from 'src/picture/picture.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GradeService {

  findAll(): string {
    return 'this.pictureRepository.find()'
  }
}
