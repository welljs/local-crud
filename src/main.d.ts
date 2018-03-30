export as namespace LocalCrud;
export = LocalCrud;

declare class LocalCrud {
  constructor(key: string, options?: LocalCrud.ILocalCrudOptions);
  public create<Data extends LocalCrud.IEntity>(data: Data | Data[]): Promise<LocalCrud.IResponse<undefined>>;
  public read(key: string, value: LocalCrud.TPropertyType): Promise<LocalCrud.IResponse<undefined>>;
  public read(): Promise<LocalCrud.IResponse<any[]>>;
  public update(key: string, value: LocalCrud.TPropertyType, updates: object): Promise<LocalCrud.IResponse<undefined>>;
  public delete(key: string, value: LocalCrud.TPropertyType): Promise<LocalCrud.IResponse<undefined>>;
}

declare namespace LocalCrud {
  enum ELocalStorageType {
    LOCAL_STORAGE = 'localStorage',
    SESSION_STORAGE = 'sessionStorage'
  }

  interface ILocalCrudOptions {
    storageType: ELocalStorageType;
    debug: boolean;
  }

  interface IBrowserStorage {
    length: number;
    setItem(key: string, value: any): void;
    getItem(key: string): any;
    removeItem(key: string): void;
    clear(): void;
    key(n: number): string;
  }

  interface IEntity {
    id: string;
  }

  type TPropertyType = string | number | boolean | null;

  interface IResponse<Data> {
    status: 'ok' | 'error';
    data?: Data;
    error?: any;
  }
}