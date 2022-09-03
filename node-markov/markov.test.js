const MarkovMachine = require('./markov.js')

test('should return valid markov machine', function () {
  let mm = new MarkovMachine("the cat in the hat");
  expect(mm).toEqual({"chains": {"cat": ["in"], "hat": [null], "in": ["the"], "the": ["cat", "hat"]}, "words": ["the", "cat", "in", "the", "hat"]});
});

test('should return valid markov text length', function () {
  let mm = new MarkovMachine("the cat in the hat");
  expect(mm.makeText(10).split(' ').length).toEqual(12);
});

test('should return valid markov text', function () {
  let mm = new MarkovMachine("the cat in the hat");
  expect(['the ', 'cat ', 'in ', 'hat '].indexOf(mm.makeText(0)) > -1).toEqual(true);
});