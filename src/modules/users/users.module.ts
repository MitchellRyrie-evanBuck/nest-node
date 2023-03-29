import { Module, CacheModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity,TagsEntity } from '@/entities/index';
import { JwtStrategy } from '@/modules/login/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, TagsEntity]),
    // CacheModule.registerAsync({

    // }),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
