For the word vectors, we're using the [GloVe database](https://nlp.stanford.edu/projects/glove/).

This needs filtering, so for most common english words, we also added the lists:

- adjectives, from: [hugsy/stuff/random-word](https://github.com/hugsy/stuff/blob/master/random-word/english-adjectives.txt)
- verbs, from: [aaronbassett/Pass-phrase](https://github.com/aaronbassett/Pass-phrase) <- cool repo, btw :)
- nouns, from: [desiquintans.com](http://www.desiquintans.com/nounlist) <- this contains plurals as well unfortunately, so it might need further cleaning...
- codenames list, from: [seanlyons/codenames](https://github.com/seanlyons/codenames/blob/master/wordlist.txt) - this should be contained in the above, but just to be sure :)

To keep this simple, the lists act as a simple whitelist filter for the wordvectors from the database.
The DB file is just read and converted to JSON, which is then distributed with the app.

For generating the cards later, we also use the codenames list.
The list was specifically chosen for its size (doensn't contain all the extensions) to make it easier to find meaningful associations.
