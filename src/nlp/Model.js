// Adapted from github.com/ml5js/ml5-library/blob/development/src/Word2vec/index.js
import * as tf from '@tensorflow/tfjs';
import * as data from '../data/model.json';

const Model = Object.entries(data.vectors).reduce((acc, [word, array]) => {
  acc[word] = tf.tensor1d(array);
  return acc;
}, {});

export { Model };
