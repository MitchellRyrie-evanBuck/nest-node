import { ArgumentMetadata, PipeTransform, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';



@Injectable()
export class userPipe implements PipeTransform{
  async transform(value: any, metadata: ArgumentMetadata) {
      const DTO = plainToInstance(metadata.metatype, value)
      const errors = await validate(DTO)
      if (errors.length){
        throw new HttpException(errors, HttpStatus.BAD_REQUEST)
      }
      return value
  }
}