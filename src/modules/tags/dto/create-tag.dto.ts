import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsArray } from "class-validator";
import { Type } from 'class-transformer';

export class CreateTagDto {
  @ApiProperty({ description: 'TAG名' })
  @IsNotEmpty({ message: 'tag名字不能为空' })
  @IsString()
  @IsArray()
  tagName!: string | Array<string> ;
}
