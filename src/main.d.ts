export = LocalCrud;
export as namespace LocalCrud;

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

  interface IResponse {
    status: 'ok' | 'error';
    data?: object;
    error?: any;
  }
}
