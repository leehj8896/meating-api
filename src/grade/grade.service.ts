import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios'

@Injectable()
export class GradeService {

  async findAll() {
    Logger.log('log test')
    const test = await axios.get('http://127.0.0.1:8002/docs' ,{
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br'    
      }
    })
    console.log(test.data)
  }

  async inference(
    file: Express.Multer.File
  ) {
    const formData = new FormData();
    formData.append('img', new Blob([file.buffer]), file.originalname)
    const url = `${process.env.AI_BASE_URL}/inference`
    console.log(`url: ${url}`)
    const response = await axios.post(url, formData)
    return response.data
  }
}
