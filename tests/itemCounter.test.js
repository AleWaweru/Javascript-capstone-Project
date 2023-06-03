import itemcounter from '../src/modules/itemCounter.js';

test('Should return correct count for items', () => {
  const dummyData = [{ item: '1' }, { item: '2' }, { item: '3' }, { item: '4' }];

  expect(itemcounter(dummyData)).toBe(4);
});

test('Should return correct count for items', () => {
  const dummyData = [{ item: '1' }, { item: '2' }];

  expect(itemcounter(dummyData)).toBe(2);
});

test('Should return correct count for items', () => {
  const dummyData = [{ item: '1' }];

  expect(itemcounter(dummyData)).toBe(1);
});

test('Should return 0 item', () => {
  const dummyData = [];

  expect(itemcounter(dummyData)).toBe(0);
});