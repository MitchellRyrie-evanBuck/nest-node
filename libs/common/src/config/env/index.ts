import developmentConfig from './development';
import productionConfig from './production';
import commonConfig from './common';

const configs = {
  development: developmentConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';

export default () => ({
  ...commonConfig,
  ...configs[env],
});
