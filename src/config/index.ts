import development from './env.development';
import production from './env.production';
import testing from './env.testing';
import * as dotenv from 'dotenv';
dotenv.config(); // 加载 .env 文件中的环境变量

const ENV_CONFIG = {
  development,
  production,
  testing,
};

console.log('=======', dotenv.config());
console.log('process.env.NODE_ENV', process.env.NODE_ENV);
export default ENV_CONFIG[process.env.NODE_ENV];
// export * from './services';
