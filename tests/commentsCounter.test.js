import commentsCounter from '../src/modules/commentsCounter.js';

test('Should return correct number of comments', () => {
  const dummyData = [{
    item_id: 1,
    username: 'Bilal',
    comment: 'Looks great',
  },
  {
    item_id: 2,
    username: 'Jane',
    comment: 'Food is great',
  },
  {
    item_id: 3,
    username: 'Tom',
    comment: 'Would like to buy',
  }];

  expect(commentsCounter(dummyData)).toBe(3);
});

test('Should return correct number of comments', () => {
  const dummyData = [{
    item_id: 1,
    username: 'Bilal',
    comment: 'Looks great',
  }];

  expect(commentsCounter(dummyData)).toBe(1);
});

test('Should return correct number of comments', () => {
  const dummyData = [{
    item_id: 1,
    username: 'Bilal',
    comment: 'Looks great',
  },
  {
    item_id: 2,
    username: 'Bilal',
    comment: 'Looks great',
  },
  {
    item_id: 3,
    username: 'Bilal',
    comment: 'Looks great',
  },
  {
    item_id: 4,
    username: 'Bilal',
    comment: 'Looks great',
  },
  {
    item_id: 5,
    username: 'Bilal',
    comment: 'Looks great',
  },
  ];

  expect(commentsCounter(dummyData)).toBe(5);
});