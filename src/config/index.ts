import development from './env.development';
import production from './env.production';
import testing from './env.testing';

const ENV_CONFIG = {
  development,
  production,
  testing,
};

export default ENV_CONFIG[process.env.NODE_ENV];
// export * from './services';
