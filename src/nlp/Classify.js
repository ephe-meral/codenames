// Adapted from github.com/ml5js/ml5-library/blob/development/src/Word2vec/index.js
import * as knnClassifier from '@tensorflow-models/knn-classifier';
import { Model } from './Model';

class Classify {
  static load(words, setClassifier) {
    const classifier = knnClassifier.create();
    words.forEach(word => {
      const vec = Model[word];
      vec && classifier.addExample(vec, word);
    });

    Promise.all(
      Object.keys(Model).map(word =>
        Classify.classOf({ classifier }, word).then(({ label: c }) => [word, c])
      )
    ).then(cls => {
      const classes = cls.reduce((acc, [w, c]) => {
        const res = acc[c] || [];
        res.push(w);
        acc[c] = res;
        return acc;
      }, {});
      setClassifier({ classifier, classes, loaded: true });
    });
  }

  static unload({ classifier }) {
    classifier.dispose();
  }

  static classOf({ classifier }, word) {
    const vec = Model[word];
    if (vec) {
      return classifier.predictClass(vec);
    }
    return { label: '', confidences: {} };
  }
}

export { Classify };
