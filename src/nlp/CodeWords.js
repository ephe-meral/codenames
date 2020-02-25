import { Model } from './Model';
import * as data from '../data/codenames.json';

const CodeWords = (() =>
  data.words.filter(word => {
    if (!Model[word]) {
      console.warn(`Codeword not in database! "${word}"`);
    }
    return Model[word];
  }))();

export { CodeWords };
