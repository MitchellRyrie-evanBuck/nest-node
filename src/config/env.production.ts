import { registerAs } from '@nestjs/config';

import { IConfig } from '@/types';

export default registerAs<IConfig>(
  '',
  (): IConfig => ({
    port: 3000,
  }),
);
