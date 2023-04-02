import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { TypeORMAdapterOptions } from 'typeorm-adapter';

export type CasbinModuleOptions = {
  path: string;
  config: TypeORMAdapterOptions;
};

export interface CasbinModuleOptionsFactory {
  createCasbinModuleOptions():
    | Promise<CasbinModuleOptions>
    | CasbinModuleOptions;
}

export interface CasbinModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory?: (
    ...args: any[]
  ) => Promise<CasbinModuleOptions> | CasbinModuleOptions;
  inject?: any[];
  useClass?: Type<CasbinModuleOptionsFactory>;
}
