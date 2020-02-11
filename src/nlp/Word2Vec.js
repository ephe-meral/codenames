// Adapted from github.com/ml5js/ml5-library/blob/development/src/Word2vec/index.js
import * as tf from '@tensorflow/tfjs';
import * as data from '../data/model.json';
import { memoize } from '../utils/memoize';

const model = Object.keys(data.vectors).reduce((acc, word) => {
  acc[word] = tf.tensor1d(data.vectors[word]);
  return acc;
}, {});

const distance = (vectorA, vectorB) => tf.util.distSquared(vectorA.dataSync(), vectorB.dataSync());

const nearest100 = memoize(
  vector =>
    Object.keys(model)
      .map(word => ({
        word,
        distance: distance(vector, model[word])
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(1, 101) // Define 100 max to allow for easier memoization
);

const average = vectors => vectors && vectors.length && tf.addN(vectors).div(vectors.length);

const dedup = (results, inputs) =>
  results.filter(r => !inputs.map(i => i.toLowerCase()).find(i => i === r.word.toLowerCase()));

class Word2Vec {
  static nearestAverage(inputs, max = 10) {
    const vectors = inputs.map(i => model[i.toLowerCase()]).filter(v => !!v);
    const avg = average(vectors);
    const results = avg ? nearest100(avg).slice(0, max) : [];
    return dedup(results, inputs);
  }

  static distance(wordA, wordB) {
    const [vectorA, vectorB] = [model[wordA], model[wordB]];
    return !vectorA || !vectorB ? NaN : distance(vectorA, vectorB);
  }
}

export { Word2Vec };
