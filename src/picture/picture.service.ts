import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePictureDto } from "./dto/create-picture.dto";
import { Picture } from "./picture.entity";
import * as fs from 'fs';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture) private pictureRepository: Repository<Picture>,
  ) {}
    
  findAll(): Promise<Picture[]> {
    return this.pictureRepository.find();
  }

  createPicture(createPictureDto: CreatePictureDto) {
    const { id, path, filename, buffer } = createPictureDto
    
    if (buffer) fs.writeFile(`${path}/${filename}`, buffer, ()=>{
      console.log('file save success')
    })

    const picture = this.pictureRepository.create({ id, path, filename })
    this.pictureRepository.save(picture)
    return picture
  }
}