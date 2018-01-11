
export enum ELocalStorageType {
  LOCAL_STORAGE = 'localStorage',
  SESSION_STORAGE = 'sessionStorage'
}

export interface ILocalCrudOptions {
  storageType: ELocalStorageType;
  debug: boolean;
}

export interface IBrowserStorage {
  length: number;
  setItem(key: string, value: any): void;
  getItem(key: string): any;
  removeItem(key: string): void;
  clear(): void;
  key(n: number): string;
}

export interface IEntity {
  id: string;
}

export type TPropertyType = string | number | boolean | null;

export interface IResponse {
  status: 'ok' | 'error';
  data?: object;
  error?: any;
}


const defaults: ILocalCrudOptions = {
  storageType: ELocalStorageType.LOCAL_STORAGE,
  debug: false
};

export class LocalCrud {
  private options: ILocalCrudOptions;
  private key: string;
  private storage: IBrowserStorage;

  constructor(key: string, options?: ILocalCrudOptions) {
    this.options = Object.assign({}, defaults, options);
    this.key = key;
    this.initStorage();
    return this;
  }

  public create<Data extends IEntity>(data: Data | Data[]): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      try {
        let items = this.loadFromStorage();
        if (Array.isArray(data)) {
          data.map((item) => item.id = this.generateGuid());
          items = items.concat(data);
        }
        else {
          data.id = this.generateGuid();
          items.push(data);
        }
        this.saveToStorage(items);
        resolve(this.okResponse({}));
      }
      catch (e) {
        reject(this.errorResponse(e));
      }
    });
  }

  public read(key?: string, value?: TPropertyType): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      let data: any[] = [];
      try {
        data = this.loadFromStorage();
      }
      catch (e) {
        return reject(this.errorResponse(e));
      }
      if (!!key && !value) {
        return reject(this.errorResponse('Porop not provided'));
      }
      else if (!key) {
        resolve(this.okResponse(data));
      }
      else {
        const found = data.find((item) => item[key] === value);
        resolve(this.okResponse(found || {}));
      }
    });
  }

  public update(key: string, value: TPropertyType, updates: object): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      let items: any[] = [];
      try {
        items = this.loadFromStorage();
      }
      catch (err) {
        return reject(this.errorResponse(err));
      }
      const index = items.findIndex((item) => item[key] === value);
      if (index === -1) {
        return reject(this.errorResponse('Not found'));
      }
      try {
        items[index] = {...items[index], ...updates};
        this.saveToStorage(items);
      }
      catch (err){
        return reject(this.errorResponse(err));
      }
      resolve(this.okResponse({}));
    });
  }

  public delete(key: string, value: TPropertyType): Promise<IResponse> {
    return new Promise((resolve, reject) => {
      let items: any[] = [];
      try {
        items = this.loadFromStorage();
      }
      catch (err) {
        return reject(this.errorResponse(err));
      }
      const index = items.findIndex((item) => item[key] === value);
      if (index === -1) {
        return reject(this.errorResponse('Not found'));
      }
      try {
        items.splice(index, 1);
        this.saveToStorage(items);
      }
      catch (err){
        return reject(this.errorResponse(err));
      }
      resolve(this.okResponse({}));
    });
  }

  private okResponse(data): IResponse {
    return {status: 'ok', data};
  }

  private errorResponse(error): IResponse {
    return {status: 'error', error};
  }

  private initStorage() {
    const {debug, storageType} = this.options;
    this.storage = window[storageType] as IBrowserStorage;
    if (debug) {
      console.debug(`${storageType} initialized`);
    }
    if (!this.storage.getItem(this.key)) {
      this.storage.setItem(this.key, JSON.stringify([]));
      if (debug) {
        console.debug(`added key ${this.key} to ${storageType} `);
      }
    }
    else {
      if (debug) {
        console.debug(`the key ${this.key} found in ${storageType}`);
      }
    }
  }

  private loadFromStorage<Data>(): Data[] {
    const {debug} = this.options;
    if (debug) {
      console.debug(`loading from storage by key <${this.key}>...`);
    }
    return JSON.parse(this.storage.getItem(this.key) || []);
  }

  private saveToStorage<Data>(data: Data | Data[]): this {
    const {debug} = this.options;
    if (debug) {
      console.debug(`writing to storage by key <${this.key}>...`);
    }
    this.storage.setItem(this.key, JSON.stringify(data));
    return this;
  }

  private generateGuid() {
    const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
  }
}
