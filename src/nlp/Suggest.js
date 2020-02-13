import { memoize } from '../utils/memoize';
import { Euclid } from './Euclid';

const top3 = memoize((word, list) => {
  const l = [...list];
  const idx = l.indexOf(word);
  if (idx !== -1) {
    l.splice(idx, 1);
  }
  return l
    .map(x => ({
      word: x,
      distance: Euclid.distance(word, x)
    }))
    .sort((a, b) => a.distance < b.distance)
    .slice(0, 2);
});

const rate = ({ top3: top }) => {
  const chooseCount = top.findIndex(({ avoid }) => !!avoid);
  if (chooseCount === 0) {
    // Nothing to choose, all to avoid
    return 1000 + 1 / top[0].distance;
  }
  const div = chooseCount === -1 ? top.length : chooseCount;
  return top.slice(0, chooseCount).reduce((sum, { distance }) => sum + distance) / div;
};

class Suggest {
  // Find and return the most promising association between words
  static getAssociation(toChoose, toAvoid) {
    if (toChoose === [] || toAvoid === []) {
      return toChoose === [] ? 'Won' : 'Lost';
    }

    const wordLookup = toChoose
      .map(c => [c, false])
      .concat(toAvoid.map(a => [a, true]))
      .reduce((acc, [w, a]) => ({ ...acc, [w]: a }), {});

    const sortedWords = toChoose.concat(toAvoid).sort((a, b) => a.word < b.word);

    // Choose top3 and their avoidance state per word
    const { word, top3: top } = toChoose
      .map(c => ({
        word: c,
        top3: top3(c, sortedWords).map(t => ({ ...t, avoid: wordLookup[t.word] }))
      }))
      .sort((a, b) => rate(a) < rate(b))[0];

    const filteredTop = top.filter(({ avoid }) => !avoid).map(({ word: w }) => w);

    const assoc = Euclid.nearestAverage([word, ...filteredTop], 100).filter(
      x => !toChoose.includes(x) && !toAvoid.includes(x)
    );

    if (!assoc) {
      return `Error: Word(s) not in model - ${word}, ${filteredTop.join(', ')}`;
    }

    return `${assoc[0].word}, ${filteredTop.length + 1} ...(${word}, ${filteredTop.join(', ')})`;
  }
}

export { Suggest };
