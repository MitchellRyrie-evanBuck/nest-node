/** 增删改查服务 */
export interface ICrudService {
  /** 查询单个 */
  findOne?: (...params: any[]) => Promise<any>
  /** 查询多个 */
  findMany?: (...params: any[]) => Promise<any>
  /** 查询分页 */
  paginate?: (...params: any[]) => Promise<any>
  /** 创建单个 */
  createOne?: (...params: any[]) => Promise<any>
  /** 更新单个 */
  updateOne?: (...params: any[]) => Promise<any>
  /** 删除单个 */
  deleteOne?: (...params: any[]) => Promise<any>
  /** 删除多个 */
  deleteMany?: (...params: any[]) => Promise<any>
}

/** 增删改查控制器 */
export interface ICrudController extends ICrudService {
  /** 导出文件 */
  export?: (...params: any[]) => Promise<void>
}
