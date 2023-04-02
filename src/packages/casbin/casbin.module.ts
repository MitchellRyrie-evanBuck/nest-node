import { DynamicModule, Module, Provider, Type } from '@nestjs/common';
import { Enforcer, newEnforcer } from 'casbin';
import TypeORMAdapter from 'typeorm-adapter';

import {
  CASBIN_MODULE_ADAPTER,
  CASBIN_MODULE_OPTIONS,
  CASBIN_MODULE_SERVICE,
} from './constants';
import {
  CasbinModuleAsyncOptions,
  CasbinModuleOptions,
  CasbinModuleOptionsFactory,
} from './types';

@Module({})
export class CasbinModule {
  static enforcer: Enforcer;

  static forRoot(options: CasbinModuleOptions): DynamicModule {
    const providers = this.createProviders(options);

    return {
      module: CasbinModule,
      providers: providers,
      exports: providers,
    };
  }

  static forRootAsync(options: CasbinModuleAsyncOptions): DynamicModule {
    const providers = this.createAsyncProviders(options);

    return {
      module: CasbinModule,
      imports: options.imports,
      providers: providers,
      exports: providers,
    };
  }

  private static createProviders(options: CasbinModuleOptions): Provider[] {
    return [
      {
        provide: CASBIN_MODULE_ADAPTER,
        useFactory: async () => await TypeORMAdapter.newAdapter(options.config),
      },
      {
        provide: CASBIN_MODULE_SERVICE,
        useFactory: async (adapter: TypeORMAdapter) => {
          this.enforcer = await newEnforcer(options.path, adapter);
          await this.enforcer.loadPolicy();
        },
        inject: [CASBIN_MODULE_ADAPTER],
      },
    ];
  }

  private static createAsyncProviders(
    options: CasbinModuleAsyncOptions,
  ): Provider[] {
    const providers: Provider[] = [
      {
        provide: CASBIN_MODULE_ADAPTER,
        useFactory: async (opts: CasbinModuleOptions) =>
          await TypeORMAdapter.newAdapter(opts.config),
        inject: [CASBIN_MODULE_OPTIONS],
      },
      {
        provide: CASBIN_MODULE_SERVICE,
        useFactory: async (
          opts: CasbinModuleOptions,
          adapter: TypeORMAdapter,
        ) => {
          this.enforcer = await newEnforcer(opts.path, adapter);
          await this.enforcer.loadPolicy();
        },
        inject: [CASBIN_MODULE_OPTIONS, CASBIN_MODULE_ADAPTER],
      },
    ];

    if (options.useClass) {
      const useClass = options.useClass as Type<CasbinModuleOptionsFactory>;

      providers.push(
        ...[
          {
            provide: CASBIN_MODULE_OPTIONS,
            useFactory: async (optionsFactory: CasbinModuleOptionsFactory) =>
              await optionsFactory.createCasbinModuleOptions(),
            inject: [useClass],
          },
          {
            provide: useClass,
            useClass,
          },
        ],
      );
    }

    if (options.useFactory) {
      providers.push({
        provide: CASBIN_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      });
    }

    return providers;
  }
}
