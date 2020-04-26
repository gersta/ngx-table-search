import { NgxTableSearchPipe } from './ngx-table-search.pipe';

describe('NgxTableSearchPipe', () => {

  let pipe: NgxTableSearchPipe;

  beforeEach( () => {
    pipe = new NgxTableSearchPipe();
  });

  it('should not break on null values', () => {
    const items = [
      { name: null, age: 23 },
      { name: 'Hans', age: null },
      { name: null, age: null },
    ];

    const results = pipe.transform(items, 'Hans');

    const expected = [{ name: 'Hans', age: null }];

    expect(results).toEqual(expected);
  });

  it('should not break on undefined values', () => {
    const items = [
      { name: undefined },
      { name: 'Hans' },
      { name: undefined },
    ];

    const results = pipe.transform(items, 'Hans');

    const expected = [{ name: 'Hans' }];

    expect(results).toEqual(expected);
  });

  it('should not be case sensitive', () => {
    const items = [
      { name: 'HUGO' },
      { name: 'hAnS' },
      { name: 'dudE' },
    ];

    const results = pipe.transform(items, 'Hans');

    const expected = [{ name: 'hAnS' }];

    expect(results).toEqual(expected);
  });

  it('should extract nested object structures', () => {
    const items = [
      { name: 'HUGO', address: { street: 'Fifth Ave' } },
      { name: 'Franz', address: { street: 'Dreiweg', country: { name: 'Hessen' } } },
      { name: 'Walter', address: { street: 'Langstrasse' } },
    ];

    // check for any value of a nested object structure
    const results = pipe.transform(items, 'Hessen');

    const expected = [{ name: 'Franz', address: { street: 'Dreiweg', country: { name: 'Hessen' } } }]

    expect(results).toEqual(expected);
  });

  it('should transform all values into strings', () => {
    const items = [
      { name: 'hans', age: 23, male: true },
      { name: 'dudie', age: 76, male: false },
      { name: 'Pedda', age: 11, male: true }
    ];

    const results = pipe.transform(items, 'true');

    const expected = [{ name: 'hans', age: 23, male: true }, { name: 'Pedda', age: 11, male: true }];

    expect(results).toEqual(expected);
  });

  it('should accept primitive data types as items', () => {
    const items = [
      'dude',
      23,
      true
    ];

    const results = pipe.transform(items, '23');

    const expected = [ 23 ];

    expect(results).toEqual(expected);
  });

  it('should ignore columns specified for exclusion', () => {
    const items = [
      { firstname: 'hans', lastname: 'hatarn', age: 23, male: true },
      { firstname: 'dudie', lastname: 'hans' , age: 76, male: false },
      { firstname: 'Pedda', lastname:  'dude', age: 11, male: true }
    ];

    const results = pipe.transform(items, 'hans', 'firstname');

    const expected = [
      { firstname: 'dudie', lastname: 'hans' , age: 76, male: false }
    ];

    expect(results).toEqual(expected);
  });

  it('should ignore multiple columns specified for exclusion', () => {
    const items = [
      { firstname: 'hans', lastname: 'hatarn', age: 23, male: true },
      { firstname: 'dudie', lastname: 'hans' , age: 76, male: false },
      { firstname: 'Pedda', lastname:  'dude', age: 11, male: true }
    ];

    // the name column is unknown, thus the items will be filtered based on all columns
    const results = pipe.transform(items, 'hans', 'firstname', 'lastname');

    // these two items include the provided filter string
    const expected = [
    ];

    expect(results).toEqual(expected);
  });

  it('should skip unknown columns', () => {
    const items = [
      { firstname: 'hans', lastname: 'hatarn', age: 23, male: true },
      { firstname: 'dudie', lastname: 'hans' , age: 76, male: false },
      { firstname: 'Pedda', lastname:  'dude', age: 11, male: true }
    ];

    // the name column is unknown, thus the items will be filtered based on all columns
    const results = pipe.transform(items, 'hans', 'name');

    // these two items include the provided filter string
    const expected = [
      { firstname: 'hans', lastname: 'hatarn', age: 23, male: true },
      { firstname: 'dudie', lastname: 'hans' , age: 76, male: false },
    ];

    expect(results).toEqual(expected);
  });
});
