import { Logger } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { time } from 'console';
import * as dayjs from 'dayjs'
import { diskStorage } from 'multer';
import * as fs from 'fs';

// uploads 폴더가 존재하지 않으면 폴더를 생성하고, 존재하면 생성하지 않습니다.
const mkdir = (directory: string) => {
  const logger = new Logger('Mkdir');
  try {
    fs.readdirSync(directory);
  } catch (err) {
    logger.log(
      `지정한 경로에 ${directory}가 존재하지 않아 ${directory}를 생성합니다.`,
    );
    fs.mkdirSync(directory);
  }
};

mkdir('upload');

export const multerOptionsFactory = (): MulterOptions => {
  return {
    storage: diskStorage({
      destination(req, file, done) { // 파일을 저장할 위치를 설정합니다
        done(null, 'upload');
      },
      filename(req, file, done) { // 파일의 이름을 설정합니다.
        const current = dayjs().format('YYYYMMDDHHmmss')
        done(null, `${current}_${file.originalname}`)
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 크기를 제한
  };
};
