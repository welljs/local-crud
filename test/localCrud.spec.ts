import {expect} from 'chai';
import 'mocha';
import {storageMock} from '../src/storageMock';
import LocalCrud, {IResponse} from '../src/LocalCrud';
import {testData, ITestDataItem} from './testData';

// adding a storage mock to global window
window.localStorage = storageMock();
// TS hack to have access to private methods and props
let localCrud;
localCrud = new LocalCrud('test');

describe('Checking Create/Read-operations...', () => {
  it ('create single object and read from storage its data', () => {
    return localCrud.create(testData[0]).then(() => {
      return localCrud.read('email', testData[0].email).then((resp: IResponse) => {
        expect(resp).to.be.an('object').that.not.empty;
        const {data} = resp;
        expect((data as ITestDataItem).email).to.equal(testData[0].email);
        expect((data as ITestDataItem).id).to.not.be.empty;
      });
    });
  });

  it ('create array of objects, and read from storage any one of it items', () => {
    return localCrud.create(testData).then(() => {
      return localCrud.read('email', testData[1].email)
        .then((resp: IResponse) => {
          const {data} = resp;
          expect((data as ITestDataItem).email).to.equal(testData[1].email);
        });
    });
  });
});

describe('Checking Update-operation...', () => {
  it ('update property and read from storage new value', () => {
    const name = 'John Dow';
    const newData = {...testData[2], name};
    return localCrud.update('email', testData[2].email, newData) .then(() => {
        return localCrud.read('email', testData[2].email).then((resp: IResponse) => {
          const {data} = resp;
          expect((data as ITestDataItem).name).to.be.equal(name);
        });
      });
  });
});

describe('Checking delete-operation...', () => {
  it ('delete property and then try to find it in storage', () => {
    return localCrud.delete('email', testData[3].email) .then(() => {
      return localCrud.read('email', testData[3].email).then((resp: IResponse) => {
        const {data} = resp;
        expect(data).to.be.empty;
      });
    });
  });
});
