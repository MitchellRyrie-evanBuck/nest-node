/** data-source.ts */
import { DataSource } from 'typeorm';
import { UserGurad } from '@/modules/users/entities/user.entity'

const AppDataSource = new DataSource({
    type: 'mysql',
      username: 'xiaowen',
      // password: '809000liuLIU',
      password: 'xiaowen',
      host: '127.0.0.1',
      port: 3306,
      database: 'node',
      // entities: [__dirname + 'src/**/*.entity{.ts,.js}'],
      entities: [UserGurad],
      synchronize: true,
});

export default AppDataSource;
