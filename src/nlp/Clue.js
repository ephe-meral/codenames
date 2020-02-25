import { Euclid } from './Euclid';

// Empirically measured for the glove 50d corpus
const MAX_DIST = 8;

// Maximum consideration: 3 keywords with one clue
const MAX_KEYCOUNT = 3;

// Maximum added random number on scoring
const MAX_RND_DIST = 4;

// Inspired by https://stackoverflow.com/a/47147597
const subsets = (array, maxLength = MAX_KEYCOUNT) =>
  array.reduce(
    (sub, value) =>
      sub.concat(sub.filter(set => set.length + 1 <= maxLength).map(set => [value, ...set])),
    [[]]
  );

const score = (clue, keys, toAvoid, rnd = Math.random() * MAX_RND_DIST) => {
  const keyAvg = keys.reduce((sum, x) => sum + Euclid.distance(clue, x), 0) / keys.length;
  const avoidAvg = toAvoid.reduce((sum, x) => sum + Euclid.distance(clue, x), 0) / toAvoid.length;
  return avoidAvg / keyAvg + rnd; // Add a random component to shuffle suggestions
};

class Clue {
  // Try to find good clues, choose the best clue for the current setup
  // The best clue is the one where the average distance of the clue to the keywords is the lowest,
  // while the average distance of the clue to the avoid words is the highest
  // For that, we need to find good candidates first.
  // We compute nearest neighbors for each keyword and iterate through the keyword combinations.
  static getClue(toChoose, toAvoid, maxDist = MAX_DIST) {
    const clues = toChoose
      .flatMap(x => Euclid.nearestAverage([x], 10).filter(y => y.distance <= maxDist))
      .map(x => x.word);

    if (clues.length === 0) {
      // This is unbounded and dangerous! (But we're reasonably sure that it will terminate)
      return toChoose.length && toAvoid.length && Clue.getClue(toChoose, toAvoid, maxDist + 1);
    }

    const keySubsets = subsets(toChoose).filter(x => x.length > 0);

    const comp = ([ac, ak, as], [bc, bk, bs]) => bs - as;

    return clues
      .map(clue => keySubsets.map(keys => [clue, keys, score(clue, keys, toAvoid)]).sort(comp)[0])
      .sort(comp)[0];
  }
}

export { Clue };
