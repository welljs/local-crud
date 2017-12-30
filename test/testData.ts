
export interface ITestDataItem {
  name: string;
  birth: string;
  email: string;
  company: string;
  id?: string;
}

export const testData: ITestDataItem[] = [
  {
    name: 'Kato',
    birth: '2017-08-22 12:05:37',
    email: 'scelerisque.dui.Suspendisse@nullamagna.org',
    company: 'Mauris LLP'
  },
  {
    name: 'Carl',
    birth: '2017-03-28 13:53:52',
    email: 'est.ac.mattis@Maurisblanditenim.net',
    company: 'Aptent Taciti Sociosqu Foundation'
  },
  {
    name: 'Rudyard',
    birth: '2017-07-14 18:29:45',
    email: 'lacinia.at@dolor.org',
    company: 'Vitae Aliquet Nec Associates'
  },
  {
    name: 'Elmo',
    birth: '2017-12-29 13:38:28',
    email: 'tincidunt.vehicula.risus@aliquet.org',
    company: 'Hendrerit LLC'
  }
];
