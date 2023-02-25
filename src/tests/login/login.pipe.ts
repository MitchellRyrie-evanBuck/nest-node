import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PipePipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    console.log('transfrom======', value, metadata);
    const DTO = plainToInstance(metadata.metatype, value);

    const errors = await validate(DTO);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    console.log('errors', errors);
    console.log('DTO', DTO);
    return value;
  }
}
