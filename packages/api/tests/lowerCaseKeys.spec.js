const lowerCaseKeys = require('../src/utils/lowerCaseKeys')

test('lowerCaseKeys function works', () => {
  const obj = { My: 4 }
  const expected = { my: 4 }

  expect(lowerCaseKeys(obj)).toEqual(expected)
})
