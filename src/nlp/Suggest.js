import { memoize } from '../utils/memoize';
import { Word2Vec } from './Word2Vec';

const top3 = memoize((word, list) => {
  const l = [...list];
  const idx = l.findIndex(word);
  if (idx !== -1) {
    l.splice(idx, 1);
  }
  return l
    .map(x => [x, Word2Vec.distance(word, x)])
    .sort((a, b) => a[1] < b[1])
    .slice(0, 2);
});

const rate = (top3) => {

}

class Suggest {
  // Find and return the most promising association between words
  static getAssociation(toChoose, toAvoid) {
    const wordLookup = Object.fromEntries(
      toChoose.map(c => [c, false]).concat(toAvoid.map(a => [a, true]))
    );

    const sortedWords = toChoose.concat(toAvoid).sort((a, b) => a.word < b.word);

    // Choose top3 and their avoidance state per word
    const top3 = toChoose.map(c => [c, top3(c, sortedWords).map(t => [t, wordLookup[t]])]).sort((a, b) => rate(a[1]) < rate(b[1]));
  }
}

export { Suggest };
